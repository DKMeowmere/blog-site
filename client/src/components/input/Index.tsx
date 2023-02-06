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
	return (
		<InputContainer width={width} height={height}>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</InputContainer>
	)
}
