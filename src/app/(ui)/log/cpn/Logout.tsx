import { FormEvent } from "react";
import { supabaseClient } from "@/lib/supabase";

export default function Logout() {

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { error } = await supabaseClient.auth.signOut()
		if (error) console.error(error.message)
	}


	return <form {...{ onSubmit }}>
		<button className="flex flex-col items-center justify-center
		rounded-xl
		outline-2 outline-red-500/70
		hover:outline-red/50 hover:bg-red-500/70 hover:scale-105
		transition-all cursor-pointer
		p-1.5 px-3
		w-fit
		h-fit">Log out
		</button>
	</form>
}