import styled from "styled-components"

export const FormContainer = styled.form`
	max-width: ${({ theme }) => theme.media.containerWidth.xs};
	padding-top: 60px;
	margin: auto;
	display: flex;
	flex-direction: column;
	gap: 20px;
	input {
		width: 100%;
		height: 40px;
	}
	button {
		height: 40px;
		background-color: ${({ theme }) => theme.colors.mainBlue};
		color: ${({ theme }) => theme.colors.whiteText};
		letter-spacing: 2px;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		&:hover {
			opacity: 0.9;
		}
	}
	.error {
		color: #f00;
	}
	a {
		&:hover {
			text-decoration: underline;
		}
	}
`
