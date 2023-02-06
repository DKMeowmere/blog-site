import styled from "styled-components"

type Props = {
	width: string
	height: string
}

export const InputContainer = styled.div<Props>`
	position: relative;
	.eye-icon {
		position: absolute;
		width: 30px;
		height: 30px;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
	input {
		padding: 5px;
		width: ${({ width }) => width};
		height: ${({ height }) => height};
	}
`
