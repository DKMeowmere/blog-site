import { Router } from "express"
import {
	deleteUser,
	login,
	signup,
	changeAvatar,
	getUser,
	updateUser,
} from "../controllers/user.js"
import requireAuth from "../middleware/requireAuth.js"
import multer from "multer"
import CustomRequest from "../types/customRequest.js"
import path from "path"
import crypto from "crypto"

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, "./static/uploads/avatars/")
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
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
})
const router = Router()

router
	.route("/:id")
	.get(getUser)
	.patch(requireAuth, updateUser)
	.delete(requireAuth, deleteUser)
router.route("/signup").post(signup)
router.route("/login").post(login)
router
	.route("/change-avatar/:id")
	.post(requireAuth, upload.single("avatarImage"), changeAvatar)

export default router
