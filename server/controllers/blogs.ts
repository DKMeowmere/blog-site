import { Request, Response } from "express"
import mongoose from "mongoose"
import Blog from "../models/blog.js"
import User from "../models/user.js"
import CustomRequest from "../types/customRequest.js"
import fs from "fs/promises"
import path from "path"
import isFileExisting from "../functions/isFileExisting.js"

export async function getBlogs(req: Request, res: Response) {
	try {
		const creatorId = req.query.creatorId
		if (!mongoose.isValidObjectId(creatorId) && creatorId) {
			throw Error("Podałeś złe id autora")
		}

		const blogs = creatorId
			? await Blog.find({
					creatorId,
			  }).sort({ createdAt: -1 })
			: await Blog.find({}).sort({ createdAt: -1 })

		res.json(blogs)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function createBlog(req: CustomRequest, res: Response) {
	try {
		const { title, body, creatorId, origin } = req.body

		if (!req.file) {
			throw Error("Brak zdjęcia")
		}

		if (!req.user) {
			throw Error("Błąd serwera")
		}

		if (creatorId !== req.user.toString()) {
			throw Error("Autor musi być zalogowany podczas tworzenia blogu")
		}

		const blog = await Blog.create({
			title,
			body,
			creatorId,
			origin,
			imageUrl: req.pathToFile,
		})

		res.status(201).json(blog)
	} catch (err: any) {
		try {
			await fs.unlink(
				path.resolve(`static/uploads/blog-images/${req.pathToFile}`)
			)
		} catch (err: any) {
			res.status(500).json({ error: err.message })
		}
		res.status(400).json({ error: err.message })
	}
}

export async function getBlog(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw Error("Złe id bloga")
		}

		const blog = await Blog.findById(id)

		if (!blog) {
			throw Error("Nie znaleziono")
		}

		res.json(blog)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updateBlog(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw Error("Złe id bloga")
		}

		const prevBlog = await Blog.findById(id, { imageUrl: 1 })

		if (!prevBlog) {
			throw Error("Nie znaleziono")
		}

		const isImageInFolder = await isFileExisting(
			`static/uploads/blog-images/${prevBlog.imageUrl}`
		)

		if (isImageInFolder && prevBlog.imageUrl) {
			await fs.unlink(
				path.resolve(`static/uploads/blog-images/${prevBlog.imageUrl}`)
			)
		}

		const blog = await Blog.findByIdAndUpdate(
			id,
			{
				...req.body,
				imageUrl: req.pathToFile,
			},
			{ new: true }
		)

		if (!blog) {
			throw Error("Nie znaleziono")
		}

		res.json(blog)
	} catch (err: any) {
		try {
			await fs.unlink(
				path.resolve(`static/uploads/blog-images/${req.pathToFile}`)
			)
		} catch (err: any) {
			res.status(500).json({ error: err.message })
		}
		res.status(400).json({ error: err.message })
	}
}

export async function deleteBlog(req: Request, res: Response) {
	try {
		const { id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			throw Error("Złe id bloga")
		}

		const blog = await Blog.findByIdAndDelete(id)

		if (!blog) {
			throw Error("Nie znaleziono")
		}

		res.status(204).json(blog)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function likeBlog(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const userId = req.user

		if (!mongoose.isValidObjectId(id)) {
			throw Error("Złe id bloga")
		}

		if (!userId) {
			throw Error("Brak id")
		}

		const blog = await Blog.findById(id)

		if (!blog) {
			throw Error("Nie znaleziono bloga")
		}
		if (blog.usersWhoLiked.includes(userId.toString())) {
			throw Error("Użytkownik już polubił tego bloga")
		}
		const pushUserToArray = [...blog.usersWhoLiked, userId.toString()]
		const updatedBlog = await Blog.findByIdAndUpdate(
			id,
			{
				likes: blog.likes + 1,
				usersWhoLiked: pushUserToArray,
			},
			{ new: true }
		)

		res.json(updatedBlog)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function cancelLikeBlog(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const userId = req.user
		if (!mongoose.isValidObjectId(id)) {
			throw Error("Złe id bloga")
		}

		if (!userId) {
			throw Error("Brak id")
		}

		const blog = await Blog.findById(id)

		if (!blog) {
			throw Error("Nie znaleziono bloga")
		}
		if (!blog.usersWhoLiked.includes(userId.toString())) {
			throw Error("Użytkownik nie polubił jeszcze tego bloga")
		}
		const removeUserToArray = blog.usersWhoLiked.filter(
			id => id !== userId.toString()
		)
		const updatedBlog = await Blog.findByIdAndUpdate(
			id,
			{
				likes: blog.likes - 1,
				usersWhoLiked: removeUserToArray,
			},
			{ new: true }
		)

		res.json(updatedBlog)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}
