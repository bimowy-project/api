import { LocaleRecord, LanguageCode } from "@/lib/locale";
import {
	ExtractDefaultValueFromOptions,
	DEFAULT_N_QUESTIONS_ID,
	DEFAULT_N_QUESTIONS_OPTION,
	OptsType
} from "./option";
import { ResourceBuilder, ResourceConfig, ResourceType } from "./resource";
import ALL_WIDGETS from "@cpn/widgets";
import React from "react";

export type ContextString = {
	type: "text";
	text: string;
	extra?: ("mono" | "latex")[];
}
export type ContextInput = { type: "input"; id: string; }
export type ContextParagraph = {
	type: "p";
	content: ContextElement[];
}
export type ContextWidget<
	T extends keyof typeof ALL_WIDGETS
> = {
	type: "widget",
	id: T,
	props: React.ComponentPropsWithoutRef<typeof ALL_WIDGETS[T]>
}
export type ContextElement = ContextString | ContextInput
export type ContextSection = ContextParagraph | ContextWidget<keyof typeof ALL_WIDGETS>

// Seed means the source array that contains the values
// so we know how did the randomly generated exercise turn out
// Eg. If the exercise was addition & the seed was [8,4], we know what the exercise was 8 + 4
// That's all we need to know (along with the exercise ID) to figure out the solution
// By calling ressources.cache.get('addition').generateSolution([8,4]) -> { answer: 12 }
export type SeedType = unknown[]

// Answers means the object with keys = input IDs & values = user-typed answers
// They can be false or true we don't know
// it's only known once the user inputs their answers and presses "Check"
// Eg. { x: 3, y : 3 }
type AnswersType = Record<string, unknown>


// This type, given the Seed, Answers & Opts generates the exercise's correct configuration type.
// For example, in generateSolution, nothing else can be given but the Seed format of the exercise

type ExtraExerciseConfig<
	S extends SeedType,
	A extends AnswersType,
	O extends OptsType
> = {
	options: O,
	validateAnswers?: ((
		seed: S,
		answers: A
	) => {
			[K in keyof A]: boolean
		}),
	generateSeed: (userOptions: ExtractDefaultValueFromOptions<O>) => S
	generateContext: (seed: S, lang: LanguageCode) => ContextSection[]
	generateSolution: (seed: S) => A
	validateOptions?: ((userOptions: ExtractDefaultValueFromOptions<O>) => LocaleRecord | void)
}

type ExerciseConfig<
	S extends SeedType,
	A extends AnswersType,
	O extends OptsType
> = Omit<ResourceConfig<ResourceType.Exercise>, "type">
	& ExtraExerciseConfig<S, A, O>

// The builder of a Exercise ressource, to build one, we need Seed, Answers & Options format
export class ExerciseBuilder<
	const S extends SeedType = SeedType, // Seed
	const A extends AnswersType = AnswersType, // Answers
	const O extends OptsType = OptsType, // Options
	C extends ExerciseConfig<S, A, O> = ExerciseConfig<S, A, O> // Config (for the instance's exercise)
> extends ResourceBuilder<ResourceType.Exercise, C & { type: ResourceType.Exercise }> {
	// Properties
	options: O;
	generateSeed: C["generateSeed"]
	generateContext: C["generateContext"]
	generateSolution: C["generateSolution"]
	validateOptions: NonNullable<C["validateOptions"]>
	validateAnswers: C["validateAnswers"]
		= ((seed: S, answers: A) => {
			const correction = this.generateSolution(seed)
			const result = {} as Record<keyof A, boolean>
			for (const key in answers) {
				result[key] = answers[key] == correction[key]
			}
			return result
		});

	// Constructor
	constructor(data: C) {
		super({ ...data, type: ResourceType.Exercise });
		this.options = data.options
		this.generateContext = data.generateContext
		this.generateSeed = data.generateSeed
		this.generateSolution = data.generateSolution
		this.validateOptions = data.validateOptions || (() => { })
	}

	generate(userOptions: ExtractDefaultValueFromOptions<O>, lang: LanguageCode) {
		const seed = this.generateSeed(userOptions)
		const context = this.generateContext(seed, lang)
		return {
			exercise_id: this.id,
			seed,
			context
		}
	}
	serialize(lang: LanguageCode) {
		const options = {
			[DEFAULT_N_QUESTIONS_ID]: DEFAULT_N_QUESTIONS_OPTION.serialize(lang),
			...Object.fromEntries(
				Object.entries(this.options).map(
					([id, option]) => [id, option.serialize(lang)]
				)
			)
		}

		return {
			...super.serialize(lang),
			options
		}
	}
}
