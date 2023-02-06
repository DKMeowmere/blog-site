import styled from "styled-components"

export const StyledNavbar = styled.nav`
	position: relative;
	z-index: 2;
	height: 70px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	box-shadow: 0px 9px 20px -7px rgba(66, 68, 90, 1);
	width: 100%;
	background-color: #fff;
	a {
		cursor: pointer;
		.logo {
			width: auto;
			height: 40px;
		}
	}
	.login-link {
		background-color: ${({ theme }) => theme.colors.mainBlue};
		color: ${({ theme }) => theme.colors.whiteText};
		text-transform: uppercase;
		font-weight: 500;
		font-size: 0.8rem;
		padding: 8px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			opacity: 0.9;
		}
	}
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
		object-fit: cover;
	}
	.icon {
		margin-left: 15px;
		width: 40px;
		height: 40px;
		cursor: pointer;
		&:hover {
			fill: #999;
		}
	}
	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.md}) {
		a {
			.logo {
				width: 120px;
				height: 50px;
			}
		}
		.avatar {
			width: 60px;
			height: 60px;
		}
		.icon {
			width: 60px;
			height: 60px;
		}
	}
`
