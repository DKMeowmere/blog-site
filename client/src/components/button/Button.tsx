import styled from "styled-components"

export const Button = styled.button<{ width: string; height: string }>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	background-color: ${({ theme }) => theme.colors.mainBlue};
	color: ${({ theme }) => theme.colors.whiteText};
	padding: 5px 10px;
	cursor: pointer;
	text-transform: uppercase;
	letter-spacing: 1.6px;
	font-weight: bold;
	border: none;
	border-radius: 10px;
	&:hover {
		opacity: 0.9;
	}
`
