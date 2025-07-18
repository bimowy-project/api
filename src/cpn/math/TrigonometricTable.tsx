import { useLanguage } from "@/lib/locale";
import { angles } from ".";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { toRounded } from "@/lib/extra";

export type TrigonometricTableProps = object
export default function TrigonometricTable() {
	const locale = useLanguage()
	return <table className="table-auto">
		<thead>
			<tr>
				<th>{{ en: "% of circle", fr: "% du cercle" }[locale]}</th>
				<th>Angle θ</th>
				<th>cos(θ)</th>
				<th>sin(θ)</th>
			</tr>
		</thead>
		<tbody>
			{
				angles
					.filter(angle => angle.inTable)
					.map(row => <tr key={row.percentage.value}>
						<td className="text-center">{row.percentage.value}
							{
								typeof (row.percentage.abs) == "number"
								&& <AproximationSubtitle value={row.percentage.abs} />
							}
						</td>
						<td className="text-center">{row.deg}° ({row.rad.value}
							{
								typeof (row.rad.abs) == "number"
								&& <AproximationSubtitle value={row.rad.abs} />
							})
						</td>
						<td className="text-center">
							{
								typeof (row.cos.value) == "string"
									? row.cos.value
									: <Latex>{"$\\frac{" + row.cos.value[0] + "}{" + row.cos.value[1] + "}$"}</Latex>
							}
							<AproximationSubtitle value={row.cos.abs} />
						</td>
						<td className="text-center">
							{
								typeof (row.sin.value) == "string"
									? row.sin.value
									: <Latex>{"$\\frac{" + row.sin.value[0] + "}{" + row.sin.value[1] + "}$"}</Latex>
							}
							<AproximationSubtitle value={row.sin.abs} />
						</td>
					</tr>)
			}
		</tbody>
	</table>
}


function AproximationSubtitle({ value }: { value: number }) {
	return <span className="opacity-50 ml-0.5 text-xs">
		≃ {toRounded(value)}
	</span>
}