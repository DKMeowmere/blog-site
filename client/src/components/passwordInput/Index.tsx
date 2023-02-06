import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { InputContainer } from "./styles"

type Props = {
	width: string
	height: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	placeholder?: string
}

export default function PasswordInput({
	width,
	height,
	value,
	onChange,
	placeholder,
}: Props) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	return (
		<InputContainer width={width} height={height}>
			<input
				type={isPasswordVisible ? "text" : "password"}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{isPasswordVisible ? (
				<AiFillEyeInvisible
					className="eye-icon"
					onClick={() => setIsPasswordVisible(false)}
				/>
			) : (
				<AiFillEye
					className="eye-icon"
					onClick={() => setIsPasswordVisible(true)}
				/>
			)}
		</InputContainer>
	)
}
