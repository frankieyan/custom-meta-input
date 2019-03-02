import React from 'react'
import styled from 'styled-components'
import { MenuIcon } from './menu-icon.component'

const StyledButton = styled.button`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid lightgrey;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover, &:focus {
    outline: 0;
    border-color: lightblue;
    background: whitesmoke;
  }
`

const MenuButton = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <MenuIcon />
  </StyledButton>
)

export { MenuButton }
