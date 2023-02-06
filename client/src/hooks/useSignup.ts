import { useState } from "react"
import { useCookies } from "react-cookie"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { login as loginAction } from "../app/features/appSlice"
import { useNavigate } from "react-router-dom"

type Props = {
	email: string
	nickname: string
	password: string
}

export const useSignup = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")
	const [, setCookie] = useCookies(["user"])
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	async function signup({ email, nickname, password }: Props) {
		setIsLoading(true)

		const res = await fetch(`${serverUrl}/api/user/signup`, {
			method: "POST",
			body: JSON.stringify({ email, nickname, password }),
			headers: { "Content-Type": "application/json" },
		})
		const data = await res.json()
		console.log(data)
		if (!res.ok) {
			setIsLoading(false)
			setError(data.error)
			return
		}

		setCookie("user", data)
		dispatch(loginAction(data))
		setIsLoading(false)
		navigate("/")
	}

	return { isLoading, error, signup }
}
