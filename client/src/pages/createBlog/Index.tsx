import React, { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { addAlert } from "../../app/features/appSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Input from "../../components/input/Index"
import { CreateBlogForm } from "./styles"

export default function CreateBlog() {
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [origin, setOrigin] = useState("")
	const [image, setImage] = useState<File | null>(null)
	const navigate = useNavigate()
	const user = useAppSelector(state => state.app.user)
	const [cookies] = useCookies()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(addAlert({ body: "Brak zdjęcia!", type: "WARNING" }))
		if (e.target.files) {
			setImage(e.target.files[0])
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData()
		if (!image || !title || !body || !user) {
			dispatch(
				addAlert({
					body: "Musisz wprowadzić wszystkie dane bloga!",
					type: "WARNING",
				})
			)
			return
		}
		formData.append("blogImage", image)
		formData.append("title", title)
		formData.append("body", body)
		formData.append("creatorId", user._id)
		formData.append("origin", origin ? origin : "")

		const res = await fetch(`${serverUrl}/api/blogs`, {
			method: "POST",
			body: formData,
			headers: {
				Authorization: `Bearer ${cookies.user.token}`,
				// "Content-Type": "multipart/form-data; boundary=NO BOUNARY GENERATING SERVER ERROR",
				//Content type set automatically, with bounary
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

		navigate(`/blogs/${data._id}`)
	}

	return (
		<CreateBlogForm onSubmit={handleSubmit}>
			<h1>Stwórz blog</h1>
			<p>Tytuł</p>
			<Input
				width="100%"
				height="50px"
				placeholder="tytuł..."
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<p>Zdjęcie do bloga</p>
			<input
				type="file"
				onChange={handleFileChange}
				className="file-input"
			/>
			{image && <img src={URL.createObjectURL(image)} alt="blog" />}
			<p>Napisz tekst</p>
			<textarea
				onChange={e => setBody(e.target.value)}
				value={body}
				placeholder="tekst bloga..."
			/>
			<p>Źródło (opcjonalnie)</p>
			<Input
				width="100%"
				height="50px"
				placeholder="źródło..."
				value={origin}
				onChange={e => setOrigin(e.target.value)}
			/>
			<button type="submit" className="submit-btn">
				Zatwierdź
			</button>
		</CreateBlogForm>
	)
}
