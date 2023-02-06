import styled from "styled-components"

export const ProfileContainer = styled.article`
	width: 90%;
	margin: auto;
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	gap: 20px;
	padding-bottom: 20px;
	.update-btn {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.avatar {
		width: 400px;
		height: 400px;
		border-radius: 50%;
		object-fit: cover;
		margin: 20px 0 20px;
	}
	h1 {
		font-size: 3rem;
		margin-bottom: 40px;
	}
	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.md}) {
		h1 {
			font-size: 5rem;
		}
	}
`
