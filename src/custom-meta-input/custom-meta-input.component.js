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

const meta = [
  { type: 'Artist name', value: 'Commodores' },
  { type: 'Song title', value: 'Thank you' },
  { type: 'Rating', value: 5 },
]

const CustomMetaInput = props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [value = '', setValue] = useState()

  function handleSelect(entry) {
    setValue(value + entry)
  }

  return (
    <InputContainer>
      <Input value={value} onChange={value => setValue(value)}/>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)} />
      <Menu open={menuOpen} meta={meta} onSelect={handleSelect}/>
    </InputContainer>
  )
}

export { CustomMetaInput }
