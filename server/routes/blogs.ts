import express from "express"
import {
	createBlog,
	deleteBlog,
	getBlog,
	getBlogs,
	updateBlog,
	likeBlog,
	cancelLikeBlog,
} from "../controllers/blogs.js"
import requireAuth from "../middleware/requireAuth.js"
import multer from "multer"
import CustomRequest from "../types/customRequest.js"
import path from "path"
import crypto from "crypto"

const router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, "./static/uploads/blog-images/")
	},
	filename(req: CustomRequest, file, callback) {
		const pathToFile = `${crypto.randomUUID()}-${file.originalname}`
		req.pathToFile = pathToFile
		callback(null, pathToFile)
	},
})

function fileFilter(
	req: CustomRequest,
	file: Express.Multer.File,
	callback: multer.FileFilterCallback
) {
	const extension = path.extname(file.originalname)
	if (extension === ".jpeg" || extension === ".jpg" || extension === ".png") {
		callback(null, true)
		return
	}

	callback(Error("Nie poprawny typ pliku, należy wysłać zdjęcie"))
}

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 10,
	},
	fileFilter,
})

router
	.route("/")
	.get(getBlogs)
	.post(requireAuth, upload.single("blogImage"), createBlog)

router
	.route("/:id")
	.get(getBlog)
	.patch(requireAuth, upload.single("blogImage"), updateBlog)
	.delete(requireAuth, deleteBlog)
router.route("/like/:id").post(requireAuth, likeBlog)
router.route("/cancel-like/:id").post(requireAuth, cancelLikeBlog)
export default router
