import React, { useEffect } from "react"
import { useLogin } from "../../hooks/useLogin"
import { FormContainer } from "./styles"
import { useState } from "react"
import LoadingScreen from "../../components/loadingScreen/Index"
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../../components/passwordInput/Index"
import Input from "../../components/input/Index"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addAlert } from "../../app/features/appSlice"

export default function Login() {
	const { login, isLoading, error } = useLogin()
	const [email, setEmail] = useState("")
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
		await login({ email, password })

		if (error) {
			dispatch(
				addAlert({
					body: error,
					type: "ERROR",
				})
			)
			return
		}
		dispatch(
			addAlert({
				body: "Udało się poprawnie zalogować",
				type: "SUCCESS",
			})
		)
		navigate("/")
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
			<PasswordInput
				width="100%"
				height="40px"
				placeholder="Podaj hasło"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button type="submit">Zatwierdź</button>
			<Link to="/signup">
				Nie masz jeszcze konta? Stwórz konto teraz!
			</Link>
		</FormContainer>
	)
}
