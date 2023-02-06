import styled from "styled-components"

export const CreateBlogForm = styled.form`
	width: 90%;
	max-width: ${({ theme }) => theme.media.containerWidth.sm};
	margin: 20px auto 0;
	padding-bottom: 20px;
	display: flex;
	gap: 20px;
	align-items: center;
	flex-direction: column;
	h1 {
		margin-bottom: 70px;
	}
	img {
		width: 100%;
		aspect-ratio: 16/9;
	}
	textarea {
		width: 100%;
		resize: vertical;
		min-height: 300px;
		padding: 5px;
		font-family: inherit;
	}
	.submit-btn {
		width: 100%;
		height: 40px;
		color: ${({ theme }) => theme.colors.whiteText};
		background-color: ${({ theme }) => theme.colors.mainBlue};
		text-transform: uppercase;
		letter-spacing: 1.6px;
		font-weight: 600;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		&:hover {
			opacity: 0.9;
		}
	}
`
