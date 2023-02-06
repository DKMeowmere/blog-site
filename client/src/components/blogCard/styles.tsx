import styled from "styled-components"

export const BlogCardContainer = styled.div`
	width: 100%;
	max-width: ${({ theme }) => theme.media.containerWidth.sm};
	background-color: #ddd;
	padding: 10px 20px;
	cursor: pointer;
	position: relative;
	p {
		margin-bottom: 40px;
	}
	img {
		width: 100%;
		height: 250px;
		margin: 20px 0;
	}
	.likes {
		position: absolute;
		bottom: 10px;
		right: 10px;
	}
	.created-at {
		position: absolute;
		bottom: 10px;
		left: 10px;
	}
`
