import React, { useState } from 'react'
import styled from 'styled-components'
import { MenuButton } from './menu-button/menu-button.component'
import { Menu } from './menu/menu.component'

const InputContainer = styled.div`
  display: flex;
  position: relative;
  font-family: arial, sans-serif;
  font-size: 14px;
`

const TextInput = styled.input`
  box-sizing: border-box;
  min-width: 240px;
  height: 40px;
  padding: 0 8px;
  background: white;
  border: 1px solid lightgrey;
  border-right: 0;
  border-radius: 4px 0 0 4px;
  font-family: arial, sans-serif;
  font-size: 14px;

  &:focus {
    outline: 0;
    border-color: lightblue;
  }
`

const CustomMetaInput = props => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <InputContainer>
      <TextInput />
      <MenuButton onClick={() => setMenuOpen(!menuOpen)} />
      <Menu open={menuOpen} />
    </InputContainer>
  )
}

export { CustomMetaInput }
