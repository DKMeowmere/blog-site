import mongoose from "mongoose"
import Blog from "../types/blog"

const blogSchema = new mongoose.Schema<Blog>(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		usersWhoLiked: {
			type: [String],
			default: [],
		},
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		origin: {
			type: String,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Blog = mongoose.model<Blog>("Blog", blogSchema)
export default Blog
