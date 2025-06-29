import { SVGAttributes } from "react"
import { Point, PointProps } from "./Point"
import { PlaneBackground } from "./PlaneBackground"
import { Y_Axis } from "./Y_Axis"
import { X_Axis } from "./X_Axis"
import { Vector, VectorProps } from "./Vector"

export type Ranges = { x: Range, y: Range }
export type Range = { min: number, max: number }

export const defaultPolyProps: SVGAttributes<SVGElement> = {
	strokeWidth: 1,
	stroke: "#e5e5e5",
	fill: "#e5e5e5",
	strokeLinecap: "round",
	strokeLinejoin: "round"
}

export const defaultSVGProps: SVGAttributes<SVGElement> = {
	viewBox: "0 0 100 100"
}

export const defaultStrokeProps: SVGAttributes<SVGElement> = {
	strokeLinejoin: "round",
	strokeLinecap: "round"
}
export const randomFillClasses = [
	"fill-blue-500",
	"fill-fuchsia-600",
	"fill-orange-500",
	"fill-red-500",
];

export const randomStrokeClasses = [
	"stroke-blue-500",
	"stroke-fuchsia-600",
	"stroke-orange-500",
	"stroke-red-500",
];

type ElemProps = {
	id: string
} & (
		({
			type: "vector"
		} & VectorProps)
		| ({
			type: "point"
		} & PointProps))

export type PlaneProps = {
	ranges: Ranges,
	elems?: ElemProps[]
}

export function getBetweenPercentage(min: number, max: number, n: number) {
	return ((n - min) / (max - min)) * 100;
}

export default function Plane({ elems = [], ranges }: PlaneProps) {
	return <div className="w-full h-full relative
	*:absolute *:w-full *:h-full
	pb-2">
		<PlaneBackground {...{ ranges }} />
		<X_Axis {...{ ranges }} />
		<Y_Axis {...{ ranges }} />
		{
			elems.map(elem => {
				switch (elem.type) {
					case "point":
						return <Point key={elem.id} {...elem} {...{ ranges }} />
					case "vector":
						return <Vector key={elem.id} {...elem} {...{ ranges }} />
				}
			})
		}
	</div>
}

