import { useEffect, useState } from "react"
import { Blogs } from "../../types/blog"
import { BlogsContainer, HomeContainer } from "./styles"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CreateBlog from "../createBlog/Index"
import BlogCard from "../../components/blogCard/Index"
import { addAlert } from "../../app/features/appSlice"

export default function Home() {
	const [blogs, setBlogs] = useState<Blogs>([])
	const user = useAppSelector(state => state.app.user)
	const serverUrl = useAppSelector(state => state.app.serverUrl)
	const dispatch = useAppDispatch()

	useEffect(() => {
		async function fetchBlogs() {
			const res = await fetch(`${serverUrl}/api/blogs`)
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

			setBlogs(data)
		}
		fetchBlogs()
	}, [])

	return (
		<HomeContainer>
			<BlogsContainer>
				{blogs.map(blog => (
					<Link key={blog._id} to={`blogs/${blog._id}`}>
						<BlogCard blog={blog} />
					</Link>
				))}
			</BlogsContainer>
			{user && <CreateBlog />}
		</HomeContainer>
	)
}
