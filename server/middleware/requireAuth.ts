import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from "../models/user.js"
import CustomRequest from "../types/customRequest.js"

interface JwtPayload {
	_id: string
}

async function requireAuth(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers
	if (!authorization) {
		return res.status(401).json({ error: "Musisz być zalogowany, żeby to zrobić" })
	}
	try {
		const token = authorization.split(" ")[1]

		const { _id } = jwt.verify(
			token,
			process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ""
		) as JwtPayload
		const user = await User.findById(_id)

		if (!user) {
			throw Error("Wrong token")
		}

		req.user = user._id as unknown as mongoose.Schema.Types.ObjectId
		next()
	} catch (err: any) {
		res.status(401).json({ error: err.message })
	}
}

export default requireAuth
