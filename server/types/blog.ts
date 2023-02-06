import mongoose from "mongoose"

type Blog = {
	title: string
	body: string
	likes: number
	usersWhoLiked: string[]
	creatorId: mongoose.Schema.Types.ObjectId
	origin?: string
	imageUrl: string
}

export default Blog
