import { ReactNode } from "react";
import DesktopSideBar from "./DesktopSideBar";
import { Language } from "@api/main";

export default function SideBarContainer({ children, locale }: { children: ReactNode, locale: Language }) {
	return <div className="flex gap-3
	w-full h-full
	p-3">
		<DesktopSideBar {...{ locale }} />
		<main className='w-full h-full
		flex justify-center'>
			{children}
		</main>
	</div>
}