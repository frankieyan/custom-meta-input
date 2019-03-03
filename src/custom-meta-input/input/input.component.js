import React, { useState } from 'react'
import styled from 'styled-components'
import { removeMetaAtGivenIndex, splitTextMetaNodes } from '../helpers/meta.helpers'
import { Pill } from './pill.component'

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

const TextNode = styled.span`
  margin-right: 4px;
  white-space: nowrap;
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
    const valueWithoutMeta = removeMetaAtGivenIndex(value, value.length - 1)

    onChange(
      value === valueWithoutMeta
        ? value.slice(0, -1)
        : valueWithoutMeta
    )
  }

  return (
    <TextInput
      tabIndex="0"
      onKeyDown={handleInputKeyDown}
    >
      {
        splitTextMetaNodes(value).map((node, index) => {
          const { type, value: nodeValue } = node

          return typeof node === 'object'
            ? <Pill key={index} type={type} value={nodeValue} />
            : <TextNode key={index}>{node}</TextNode>
        })
      }
    </TextInput>
  )
}

export { Input }
