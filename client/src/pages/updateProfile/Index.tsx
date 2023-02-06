import { FormEvent, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { Button } from "../../components/button/Button"
import { User } from "../../types/user"
import { UpdateProfileForm } from "./styles"
import Input from "../../components/input/Index"
import { useDispatch } from "react-redux"
import { addAlert, login } from "../../app/features/appSlice"
import PasswordInput from "../../components/input/Index"
import { useLogout } from "../../hooks/useLogout"
import { useAvatarUrl } from "../../hooks/useAvatarUrl"
import LoadingScreen from "../../components/loadingScreen/Index"

export default function UpdateProfile() {
	const [nickname, setNickname] = useState("")
	const [password, setPassword] = useState("")
	const [image, setImage] = useState<File | null>(null)
	const [profile, setProfile] = useState<User | null>(null)
	const navigate = useNavigate()
	const user = useAppSelector(state => state.app.user)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const { id } = useParams()
	const [cookies, setCookies] = useCookies()
	const dispatch = useDispatch()
	const { logout } = useLogout()
	const { getAvatarUrl } = useAvatarUrl()

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) {
			dispatch(
				addAlert({
					body: "Nie podałeś zdjęcia do edycji",
					type: "WARNING",
				})
			)
			return
		}
		setImage(e.target.files[0])
	}

	async function handleAvatarChange() {
		if (!profile || !image) {
			dispatch(
				addAlert({
					body: "Nie podałeś zdjęcia do edycji",
					type: "WARNING",
				})
			)
			return
		}
		const formData = new FormData()
		formData.append("avatarImage", image)

		const res = await fetch(
			`${serverUrl}/api/user/change-avatar/${profile._id}`,
			{
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${cookies.user.token}`,
				},
			}
		)
		const data = await res.json()

		if (!res.ok) {
			return
		}

		dispatch(login({ user: data, token: cookies.token }))
		setCookies("user", data)
		setProfile(prevProfile => ({
			...prevProfile,
			...data,
		}))
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!profile) {
			return
		}

		const res = await fetch(`${serverUrl}/api/user/${profile._id}`, {
			method: "PATCH",
			body: JSON.stringify({
				nickname,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.user.token}`,
			},
		})
		const data = await res.json()

		if (!res.ok) {
			dispatch(
				addAlert({
					body: data.error,
					type: "ERROR",
				})
			)
			return
		}

		dispatch(
			addAlert({
				body: "Zaaktualizowano profil pomyślnie",
				type: "SUCCESS",
			})
		)
		setProfile(prevProfile => ({
			...prevProfile,
			...data,
		}))
	}

	async function deleteUser(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault()

		if (!password || !profile) {
			dispatch(
				addAlert({
					body: "Musisz podać hasło by usunąć ten profil",
					type: "WARNING",
				})
			)
			return
		}

		const res = await fetch(`${serverUrl}/api/user/${profile._id}`, {
			method: "DELETE",
			body: JSON.stringify({ password }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.user.token}`,
			},
		})
		const data = await res.json()

		if (!res.ok) {
			dispatch(
				addAlert({
					body: data.error,
					type: "ERROR",
				})
			)
			return
		}

		dispatch(
			addAlert({
				body: "Usunięto profil pomyślnie",
				type: "SUCCESS",
			})
		)
		navigate("/")
		logout()
	}

	useEffect(() => {
		async function fetchProfile() {
			if (!user) {
				dispatch(
					addAlert({
						body: "Musisz być zalogowany na ten profil by go edytować",
						type: "WARNING",
					})
				)
				navigate("/")
				return
			}

			const res = await fetch(`${serverUrl}/api/user/${id}`)
			const data = await res.json()

			if (!res.ok || data.error) {
				dispatch(
					addAlert({
						body: data.error,
						type: "ERROR",
					})
				)
				return
			}
			setProfile(data)
			setNickname(data.nickname)

			if (data._id !== user._id) {
				dispatch(
					addAlert({
						body: "Musisz być zalogowany na ten profil by go edytować",
						type: "WARNING",
					})
				)
				navigate("/")
			}
		}
		fetchProfile()
	}, [user])

	return (
		<UpdateProfileForm onSubmit={handleSubmit}>
			{!profile && <LoadingScreen />}
			<h1>Zaaktualizuj profil</h1>
			<img
				className="avatar"
				alt="avatar"
				src={
					image
						? URL.createObjectURL(image)
						: getAvatarUrl(profile?.avatarUrl)
				}
			/>
			<input type="file" onChange={handleFileChange} />
			<Button
				width="auto"
				height="40px"
				onClick={handleAvatarChange}
				type="button"
			>
				Zmień zdjęcie profilowe
			</Button>
			<p>Zmień pseudonim</p>
			<Input
				width="100%"
				height="40px"
				value={nickname}
				placeholder="wpisz pseudonim..."
				onChange={e => setNickname(e.target.value)}
			/>
			<Button width="auto" height="40px" type="submit">
				Zatwierdź
			</Button>
			<p>Usuń konto (należy wpisać poprawne hasło do konta)</p>
			<PasswordInput
				width="100%"
				height="40px"
				onChange={e => setPassword(e.target.value)}
				value={password}
				placeholder="hasło..."
			/>
			<Button
				width="auto"
				height="40px"
				type="button"
				className="delete-btn"
				onClick={deleteUser}
			>
				Usuń konto
			</Button>
		</UpdateProfileForm>
	)
}
