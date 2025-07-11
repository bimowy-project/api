"use client"
import Logout from "./Logout"
import Login from "./Login"
import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { useAuthStateChange } from "@/lib/supabase"

export default function LogBox() {
	const [user, setUser] = useState<User>()

	useAuthStateChange(setUser)

	return (
		<div className="w-full h-full flex justify-center items-center">
			{
				!user
					? <Login />
					: <Logout />
			}
		</div>
	)
}