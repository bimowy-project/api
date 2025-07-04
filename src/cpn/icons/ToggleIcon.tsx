import { defaultIconProps } from "./util";

export default function ToggleIcon({ active = false, className }: { active?: boolean, className?: string }) {
	return <svg
		{...defaultIconProps}
		{...{ className }}
	>
		{
			active
				// Minus icon
				? <path
					d="M306-416q-27.3 0-45.65-18.79-18.35-18.79-18.35-45 0-27.21 18.35-45.71T306-544h348q27.3 0 45.65 18.29Q718-507.42 718-480.21 718-454 699.65-435T654-416H306Z"
				/>
				// Plus icon
				: <path
					d="M416-416H258q-27.3 0-45.65-18.99Q194-453.98 194-479.79q0-27.21 18.35-45.71T258-544h158v-159q0-25.9 18.99-44.95Q453.98-767 479.79-767t45.01 19.05Q544-728.9 544-703v159h158q27.3 0 45.65 18.29 18.35 18.29 18.35 45T747.65-435Q729.3-416 702-416H544v158q0 25.9-18.99 44.95Q506.02-194 480.21-194t-45.01-19.05Q416-232.1 416-258v-158Z" />
		}
	</svg>
}