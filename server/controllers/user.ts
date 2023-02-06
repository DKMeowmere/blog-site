import { Request, Response } from "express"
import validator from "validator"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import mongoose, { isValidObjectId } from "mongoose"
import CustomRequest from "../types/customRequest.js"
import fs from "fs/promises"
import path from "path"

function createToken(_id: string) {
	if (!process.env.TOKEN_SECRET) {
		throw new Error("Błąd serwera")
	}
	return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "3d" })
}

export async function getUser(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		if (!isValidObjectId(id)) {
			throw Error("Złe id")
		}

		const user = await User.findOne(
			{ _id: id },
			{
				_id: 1,
				email: 1,
				nickname: 1,
				avatarUrl: 1,
				createdAt: 1,
				updatedAt: 1,
			}
		)

		if (!user) {
			throw Error("Nie znaleziono")
		}

		res.status(200).json(user)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body
		const authorization = req.headers.authorization

		if (authorization) {
			//if not login or password, try to login with token
			const token = authorization.split(" ")[1]

			const { _id } = jwt.verify(
				token,
				process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : ""
			) as JwtPayload
			const user = await User.findById(_id)
			if (!user) {
				throw Error("Błąd w logowaniu")
			}

			const newToken = createToken(user._id.toString())
			res.json({
				user,
				token: newToken,
			})
			return
		}

		if (!email || !password) {
			throw Error("Wszystkie pola muszą zostać wypełnione")
		}

		const user = await User.findOne({ email })

		if (!user) {
			throw Error("Użytkownik z podanym emailem nie istnieje")
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) {
			throw Error("Podałeś błędne hasło")
		}

		const token = createToken(user._id.toString())
		res.json({
			user,
			token,
		})
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function signup(req: Request, res: Response) {
	try {
		const { email, nickname, password } = req.body

		if (!email || !nickname || !password) {
			throw Error("Musisz wypełnić wszystkie pola")
		}

		if (!validator.isEmail(email)) {
			throw Error("Zły email")
		}

		if (
			!validator.isStrongPassword(password, {
				minLength: 8,
				minNumbers: 1,
				minSymbols: 0,
				minUppercase: 1,
				minLowercase: 1,
			})
		) {
			throw Error("Podaj silniejsze hasło")
		}

		const isEmailInDb = await User.findOne({ email })

		if (isEmailInDb) {
			throw Error("Konto z podanym emailem już istnieje")
		}

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const user = await User.create({ email, nickname, password: hash })
		const token = createToken(user._id.toString())

		res.status(201).json({ user, token })
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function updateUser(req: CustomRequest, res: Response) {
	try {
		const { email, password } = req.body
		const { id } = req.params

		if (email || password) {
			throw Error("Nie możesz zmienić emaila i hasła")
		}

		if (!mongoose.isValidObjectId(id)) {
			throw Error("Podałeś złe id")
		}

		const user = await User.findByIdAndUpdate(id, req.body, { new: true })

		if (!user) {
			throw Error("nie znaleziono")
		}
		user.password = ""

		res.json(user)
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function deleteUser(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		const { password } = req.body

		if (!isValidObjectId(id)) {
			throw Error("Złe id")
		}

		if (!req.user) {
			throw Error("Błąd serwera")
		}

		if (!password) {
			throw Error("Musisz podać hasło, żeby usunąc ten profil")
		}

		const prevUser = await User.findById(id, { password: 1 })
		if (!prevUser) {
			throw Error("Błędne id użytkownika")
		}

		const encryptedPassword = prevUser.password

		if (!encryptedPassword) {
			throw Error("Złe id")
		}

		console.log(password)
		console.log(encryptedPassword)
		const isPasswordCorrect = await bcrypt.compare(
			password,
			encryptedPassword.toString()
		)
		console.log(isPasswordCorrect)
		if (!isPasswordCorrect) {
			throw Error("Podałeś błędne hasło")
		}

		if (id !== req.user.toString()) {
			throw Error("Musisz być zalogowany żeby usunąć konto")
		}

		const user = await User.findByIdAndDelete(id)

		if (!user) {
			throw Error("Nie znaleziono")
		}

		res.status(204).json({ user })
	} catch (err: any) {
		res.status(400).json({ error: err.message })
	}
}

export async function changeAvatar(req: CustomRequest, res: Response) {
	try {
		const { id } = req.params
		if (!req.file) {
			throw Error("Brak zdjęcia profilowego")
		}

		if (!req.pathToFile) {
			throw Error("Błąd serwera")
		}

		if (!isValidObjectId(id)) {
			throw Error("Złe id")
		}

		if (!req.user) {
			throw Error("Błąd serwera")
		}

		if (id !== req.user.toString()) {
			throw Error(
				"Musisz być zalogowany, żeby zaauktualizować zdjęcie profilowe"
			)
		}
		const prevUser = await User.findById(id, { avatarUrl: 1 })

		if (!prevUser) {
			throw Error("Nie znaleziono")
		}

		prevUser.avatarUrl &&
			(await fs.unlink(
				path.resolve(`static/uploads/avatars/${prevUser.avatarUrl}`)
			))

		const user = await User.findByIdAndUpdate(
			id,
			{ avatarUrl: req.pathToFile },
			{ new: true }
		)

		if (!user) {
			throw Error("Nie znaleziono")
		}

		res.status(200).json(user)
	} catch (err: any) {
		try {
			await fs.unlink(
				path.resolve(`static/uploads/avatars/${req.pathToFile}`)
			)
		} catch (err: any) {
			res.status(500).json({ error: err.message })
		}
		res.status(400).json({ error: err.message })
	}
}
