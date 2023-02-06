import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDateFormat } from "../../hooks/useDateFormat"
import { Blog } from "../../types/blog"
import { BlogContainer } from "./styles"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import LoadingScreen from "../../components/loadingScreen/Index"
import { useCookies } from "react-cookie"
import { User } from "../../types/user"
import { Button } from "../../components/button/Button"
import { useAvatarUrl } from "../../hooks/useAvatarUrl"
import { addAlert } from "../../app/features/appSlice"

export default function BlogComponent() {
	const [blog, setBlog] = useState<Blog | null>(null)
	const [author, setAuthor] = useState<User | null>(null)
	const [isUserBlogAuthor, setIsUserBlogAuthor] = useState(false)
	const [userLikedBlog, setUserLikedBlog] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { id } = useParams()
	const { formatDate } = useDateFormat()
	const user = useAppSelector(state => state.app.user)
	const [cookies] = useCookies()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const { getAvatarUrl } = useAvatarUrl()
	const dispatch = useAppDispatch()

	const like = async () => {
		if (!blog || !user) {
			dispatch(addAlert({ body: "Musisz być zalogowany by to zrobić", type: "WARNING" }))
			return
		}
		setIsLoading(true)
		const res = await fetch(
			`${serverUrl}/api/blogs/like/${blog._id}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${cookies.user.token}`,
				},
			}
		)
		const data = await res.json()

		if (!res.ok) {
			dispatch(addAlert({ body: data.error, type: "ERROR" }))
			setIsLoading(false)
			return
		}

		dispatch(addAlert({ body: "Udało się polubić ten blog", type: "SUCCESS" }))
		setBlog(data)
		setUserLikedBlog(true)
		setIsLoading(false)
	}

	const cancelLike = async () => {
		if (!blog || !user) {
			dispatch(addAlert({ body: "Musisz być zalogowany by to zrobić", type: "WARNING" }))
			return
		}
		setIsLoading(true)

		const res = await fetch(
			`${serverUrl}/api/blogs/cancel-like/${blog._id}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${cookies.user.token}`,
				},
			}
		)
		const data = await res.json()

		if (!res.ok) {
			dispatch(addAlert({ body: data.error, type: "ERROR" }))
			setIsLoading(false)
			return
		}
		
		dispatch(addAlert({ body: "Udało się cofnąć polubienie tego bloga", type: "SUCCESS" }))
		setBlog(data)
		setUserLikedBlog(false)
		setIsLoading(false)
	}

	useEffect(() => {
		if (!user || !blog) {
			return
		}
		setUserLikedBlog(blog.usersWhoLiked.includes(user._id))
	}, [user, blog, userLikedBlog])

	useEffect(() => {
		async function fetchBlog() {
			const res = await fetch(`${serverUrl}/api/blogs/${id}`)
			const data = await res.json()

			if (!res.ok || data.error) {
				dispatch(addAlert({ body: data.error, type: "ERROR" }))
				return
			}

			setBlog(data)
		}
		fetchBlog()
	}, [])

	useEffect(() => {
		async function fetchAuthor() {
			if (!blog) {
				return
			}

			const res = await fetch(`${serverUrl}/api/user/${blog.creatorId}`)
			const data = await res.json()

			if (!res.ok || data.error) {
				dispatch(addAlert({ body: data.error, type: "ERROR" }))
				return
			}

			setAuthor(data)
			setIsUserBlogAuthor(blog.creatorId === (user ? user._id : false))
		}
		fetchAuthor()
	}, [blog])

	if (!blog) {
		return (
			<BlogContainer>
				<div>Błąd</div>
				<Link to="/">Wróć do strony głównej</Link>
			</BlogContainer>
		)
	}

	return (
		<BlogContainer>
			{isLoading && <LoadingScreen />}
			<img
				src={`${serverUrl}/static/uploads/blog-images/${blog.imageUrl}`}
				alt="blog"
			/>
			{author && (
				<div className="author">
					<Link
						to={`/profile/${author._id}`}
						className="profile-link"
					>
						<h3 className="author-header">{author.nickname}</h3>
						<img
							src={getAvatarUrl(author.avatarUrl)}
							alt="avatar"
						/>
					</Link>
					{isUserBlogAuthor && (
						<Link
							to={`/blogs/${blog._id}/update`}
							className="update-btn"
						>
							<Button width="auto" height="40px">
								Zaaktualizuj blog
							</Button>
						</Link>
					)}
				</div>
			)}
			<h1>{blog.title}</h1>
			<div className="createdAt">{formatDate(blog.createdAt)}</div>
			<p>{blog.body}</p>
			<div className="likes" onClick={userLikedBlog ? cancelLike : like}>
				{userLikedBlog ? <AiFillLike /> : <AiOutlineLike />}
				{blog.likes}
			</div>
			{blog.origin && <p>{`Źródło: ${blog.origin}`}</p>}
		</BlogContainer>
	)
}
