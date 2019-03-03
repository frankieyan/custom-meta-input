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

const CustomMetaInput = ({ metaOptions = [], onChange = () => undefined }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [value = '', setValue] = useState()

  function handleSelect(entry) {
    const newValue = value + entry
    setValue(newValue)
    onChange(newValue)
  }

  function handleInput(newValue) {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <InputContainer>
      <Input value={value} onChange={handleInput}/>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)} />
      <Menu open={menuOpen} meta={metaOptions} onSelect={handleSelect}/>
    </InputContainer>
  )
}

export { CustomMetaInput }
