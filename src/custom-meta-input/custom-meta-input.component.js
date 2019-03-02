import React, { useState } from 'react'
import styled from 'styled-components'
import { MenuButton } from './menu-button/menu-button.component'
import { Menu } from './menu/menu.component'
import { Input } from './input/input.component'

const InputContainer = styled.div`
  display: flex;
  position: relative;
  font-family: arial, sans-serif;
  font-size: 14px;
`

const CustomMetaInput = props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [value, setValue] = useState()

  return (
    <InputContainer>
      <Input value={value} onChange={value => setValue(value)}/>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)} />
      <Menu open={menuOpen} />
    </InputContainer>
  )
}

export { CustomMetaInput }
