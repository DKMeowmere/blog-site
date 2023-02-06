import mongoose from "mongoose"
import User from "../types/user"

const userSchema = new mongoose.Schema<User>(
	{
		email: {
			type: String,
			required: true,
		},
		nickname: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatarUrl: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User
