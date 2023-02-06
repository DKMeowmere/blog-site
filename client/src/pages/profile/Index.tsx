import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { addAlert } from "../../app/features/appSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import BlogCard from "../../components/blogCard/Index"
import { Button } from "../../components/button/Button"
import { useAvatarUrl } from "../../hooks/useAvatarUrl"
import { Blogs } from "../../types/blog"
import { User } from "../../types/user"
import { ProfileContainer } from "./styles"

export default function Profile() {
	const user = useAppSelector(state => state.app.user)
	const { id } = useParams()
	const [profile, setProfile] = useState<User | null>(null)
	const [profileBlogs, setProfileBlogs] = useState<Blogs | null>(null)
	const [isUserProfileOwner, setIsUserProfileOwner] = useState(false)
	const { getAvatarUrl } = useAvatarUrl()
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()

	useEffect(() => {
		async function fetchAuthor() {
			if (!id) {
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
			if (user) {
				setIsUserProfileOwner(data._id === user._id)
			}
		}
		fetchAuthor()
	}, [id, user])

	useEffect(() => {
		async function fetchBlogs() {
			if (!profile) {
				return
			}

			const res = await fetch(
				`${serverUrl}/api/blogs?creatorId=${profile._id}`
			)
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

			setProfileBlogs(data)
		}
		fetchBlogs()
	}, [profile])

	if (!profile) {
		return <ProfileContainer>Ładowanie...</ProfileContainer>
	}

	return (
		<ProfileContainer>
			<Link to={`/profile/${profile._id}/update`} className="update-btn">
				{isUserProfileOwner && (
					<Button width="auto" height="40px">
						Zaaktualizuj profil
					</Button>
				)}
			</Link>
			<img
				src={getAvatarUrl(profile.avatarUrl)}
				alt="avatar"
				className="avatar"
			/>
			<h1>{profile.nickname}</h1>
			<h2>Blogi użytkownika:</h2>
			{profileBlogs &&
				profileBlogs.map(blog => (
					<Link key={blog._id} to={`/blogs/${blog._id}`}>
						<BlogCard blog={blog} />
					</Link>
				))}
			{!profileBlogs?.length && (
				<p>Brak blogów napisanych przez użytkownika</p>
			)}
			<Link to="/blogs/create">
				<Button width="100%" height="40px">
					Napisz bloga
				</Button>
			</Link>
		</ProfileContainer>
	)
}
