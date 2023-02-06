import { UpdateBlogContainer } from "./styles"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Input from "../../components/input/Index"
import { Blog } from "../../types/blog"
import { addAlert } from "../../app/features/appSlice"

export default function UpdateBlog() {
	const [blog, setBlog] = useState<Blog | null>(null)
	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")
	const [origin, setOrigin] = useState("")
	const [image, setImage] = useState<File | null>(null)
	const navigate = useNavigate()
	const user = useAppSelector(state => state.app.user)
	const { id } = useParams()
	const [cookies] = useCookies()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()

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

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!blog || !blog._id) {
			return
		}

		const formData = new FormData()
		if (image) formData.append("blogImage", image)
		if (title) formData.append("title", title)
		if (body) formData.append("body", body)
		if (origin) formData.append("origin", origin)

		if (
			!formData.get("blogImage") &&
			!formData.get("title") &&
			!formData.get("body") &&
			!formData.get("origin")
		) {
			dispatch(
				addAlert({
					body: "Nie podałeś żadnej wartości do edycji",
					type: "WARNING",
				})
			)
			return
		}
		const res = await fetch(`${serverUrl}/api/blogs/${blog._id}`, {
			method: "PATCH",
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
			navigate(`/`)
			return
		}
		dispatch(
			addAlert({
				body: "Udało się zeedytować pomyślnie ten blog",
				type: "SUCCESS",
			})
		)
		navigate(`/`)
	}

	useEffect(() => {
		async function fetchBlog() {
			if (!user) {
				dispatch(
					addAlert({
						body: "Musisz być zalogowany na profil autora by go edytować",
						type: "WARNING",
					})
				)
				navigate("/")
				return
			}

			const res = await fetch(`${serverUrl}/api/blogs/${id}`)
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
			setBlog(data)
			setTitle(data.title)
			setBody(data.body)
			setOrigin(data.origin)

			if (data.creatorId !== user._id) {
				dispatch(
					addAlert({
						body: "Musisz być zalogowany na profil autora by go edytować",
						type: "WARNING",
					})
				)
				navigate("/")
			}
		}
		fetchBlog()
	}, [user])

	return (
		<UpdateBlogContainer onSubmit={handleSubmit}>
			<h1>Zaaktualizuj blog</h1>
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
			{blog && (
				<img
					src={
						image
							? URL.createObjectURL(image)
							: `${serverUrl}/static/uploads/blog-images/${blog.imageUrl}`
					}
					alt="blog"
				/>
			)}
			<p>Napisz tekst</p>
			<textarea
				onChange={e => setBody(e.target.value)}
				value={body}
				placeholder="tekst bloga..."
			/>
			<p>Źródło</p>
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
		</UpdateBlogContainer>
	)
}
