import styled from "styled-components"

export const UpdateProfileForm = styled.form`
	width: 90%;
	margin: auto;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding-bottom: 20px;
	.avatar {
		width: 100%;
		max-width: 400px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		object-fit: cover;
		margin: 20px 0 0;
	}
	h1 {
		margin-top: 20px;
	}
	.delete-btn {
		background-color: ${({ theme }) => theme.colors.errorMain};
	}
`
