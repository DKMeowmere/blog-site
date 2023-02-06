export type Blog = {
	_id: string
	title: string
	body: string
	likes: number
	usersWhoLiked: string[]
	creatorId: string
	createdAt: string
	updatedAt: string
	origin?: string
	imageUrl: string
}

export type Blogs = Blog[]
