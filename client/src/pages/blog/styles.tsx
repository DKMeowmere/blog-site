import styled from "styled-components"

export const BlogContainer = styled.section`
	margin: auto;
	padding: 20px 0;
	width: 90%;
	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}
	.author {
		display: block;
		margin-top: 20px;
		position: relative;
		.profile-link {
			display: flex;
			align-items: center;
			max-width: 400px;
			width: auto;
			.author-header {
				margin: 0;
			}
			img {
				margin-left: 5px;
				width: 30px;
				height: 30px;
				object-fit: cover;
				border-radius: 50%;
			}
		}
		.update-btn {
			position: absolute;
			right: 0;
			top: -10px;
		}
	}
	h1 {
		font-size: 3rem;
	}
	.createdAt {
		font-size: 1.2rem;
		margin: 10px 0;
		font-weight: 500;
	}
	p {
		text-align: justify;
		padding: 10px 0;
	}
	.likes {
		width: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
		cursor: pointer;
		&:hover svg {
			fill: #888;
		}
		svg {
			margin-right: 5px;
			width: 30px;
			height: 30px;
		}
	}
	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.md}) {
		img {
			height: 400px;
		}
	}
`
