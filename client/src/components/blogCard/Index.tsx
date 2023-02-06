import { useDateFormat } from "../../hooks/useDateFormat"
import { Blog } from "../../types/blog"
import { BlogCardContainer } from "./styles"
import { AiFillLike } from "react-icons/ai"
import { useAppSelector } from "../../app/hooks"

type Props = {
	blog: Blog
}

export default function BlogCard({ blog }: Props) {
	const { formatDate } = useDateFormat()
	const { title, body, imageUrl, likes, createdAt } = blog
	const serverUrl = useAppSelector(state => state.app.serverUrl)

	return (
		<BlogCardContainer>
			<h2>{title}</h2>
			<img
				src={`${serverUrl}/static/uploads/blog-images/${imageUrl}`}
				alt="blog"
			/>
			<p>{body.slice(0, 100)}...</p>
			<div className="likes">
				<span className="likes-count">{likes}</span>
				<AiFillLike />
			</div>
			<span className="created-at">{formatDate(createdAt)}</span>
		</BlogCardContainer>
	)
}
