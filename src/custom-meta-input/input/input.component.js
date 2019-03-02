import React, { useState } from 'react'
import styled from 'styled-components'

const TextInput = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 240px;
  height: 40px;
  padding: 0 8px;
  overflow: auto;
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

const Input = ({ value, onChange }) => {
  function handleInputKeyDown({ key }) {
    switch (key) {
      case 'Backspace':
        return handleDeleteText()
      case ' ':
        return handleTextInput(key)
      default:
        break
      }

    if (/^.{1}$/.test(key)) {
      return handleTextInput(key)
    }
  }

  function handleTextInput(key) {
    const previousValue = value || ''
    onChange(previousValue + key)
  }

  function handleDeleteText() {
    onChange(value.slice(0, -1))
  }

  return (
    <TextInput
      tabIndex="0"
      onKeyDown={handleInputKeyDown}
    >
      {value}
    </TextInput>
  )
}

export { Input }
