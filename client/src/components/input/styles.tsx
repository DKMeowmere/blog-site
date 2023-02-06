import styled from "styled-components"

type Props = {
	width: string
	height: string
}

export const InputContainer = styled.div<Props>`
	position: relative;
  width: ${({ width }) => width};
	input {
		padding: 5px;
    width: ${({ width }) => width};
		height: ${({ height }) => height};
	}
`
