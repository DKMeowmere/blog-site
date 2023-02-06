import styled from "styled-components"

export const LoadingScreenContainer = styled.div`
	width: 100%;
	height: 100vh;
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #0008;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const Spinner = styled.div`
	width: 80px;
	height: 80px;
	border-radius: 50%;
	border: 5px solid #000;
`
