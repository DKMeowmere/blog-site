import styled from "styled-components"

export const HomeContainer = styled.article`
	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.lg}) {
		flex-direction: row;
	}
`

export const BlogsContainer = styled.section`
	width: 90%;
	max-width: ${({ theme }) => theme.media.containerWidth.sm};
	display: flex;
	flex-direction: column;
	margin: 20px auto 0;
	gap: 20px;
	@media screen and (min-width: ${({ theme }) =>
			theme.media.breakpoints.lg}) {
		margin: 20px 0 0 20px;
	}
`
