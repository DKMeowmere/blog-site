import styled from "styled-components"

export const Container = styled.article<{ bgcolor: string }>`
	width: 100%;
	background: ${({ bgcolor }) => bgcolor};
	min-height: 100vh;
`
