import React, { useEffect } from "react"
import { FormContainer } from "./styles"
import { useState } from "react"
import LoadingScreen from "../../components/loadingScreen/Index"
import { useSignup } from "../../hooks/useSignup"
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../../components/passwordInput/Index"
import Input from "../../components/input/Index"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addAlert } from "../../app/features/appSlice"

export default function Signup() {
	const { signup, isLoading, error } = useSignup()
	const [email, setEmail] = useState("")
	const [nickname, setNickname] = useState("")
	const [password, setPassword] = useState("")
	const user = useAppSelector(state => state.app.user)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [user])

	async function handleClick(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!email || !password) {
			dispatch(
				addAlert({
					body: "Musisz podać email i hasło",
					type: "WARNING",
				})
			)
			return
		}
		await signup({ email, nickname, password })

		if (error) {
			dispatch(
				addAlert({
					body: error,
					type: "ERROR",
				})
			)
		}
		return
	}

	return (
		<FormContainer onSubmit={handleClick}>
			{isLoading && <LoadingScreen />}
			<Input
				width="100%"
				height="40px"
				placeholder="Podaj email"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<Input
				width="100%"
				height="40px"
				placeholder="Podaj nick"
				value={nickname}
				onChange={e => setNickname(e.target.value)}
			/>
			<PasswordInput
				width="100%"
				height="40px"
				placeholder="Podaj hasło"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button type="submit">Zatwierdź</button>
			{error && <div className="error">{error}</div>}
			<Link to="/login">Masz już konto? Zaloguj się!</Link>
		</FormContainer>
	)
}
