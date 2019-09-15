import React from 'react'
import styled, { keyframes } from 'styled-components'
import { removeMetaAtGivenIndex, splitTextMetaNodes } from '../helpers/meta.helpers'
import { Pill } from './pill.component'

const caretAnimation = keyframes`
  0% { visibility: visible; }
  50% { visibility: hidden; }
  100% { visibility: hidden; }
`

const TextInput = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  overflow: auto;
  background: white;
  border: 1px solid lightgrey;
  border-right: 0;
  border-radius: 4px 0 0 4px;
  font-family: arial, sans-serif;
  font-size: 14px;
  cursor: text;

  &:focus {
    outline: 0;
    border-color: lightblue;

    &:after {
      content: '';
      height: 14px;
      width: 1px;
      background: black;

      animation: ${caretAnimation} 1s linear infinite;
    }
  }
`

const TextNode = styled.span`
  white-space: nowrap;

  :not(:last-child) {
    margin-right: 4px;
  }
`

const Input = ({ value, onChange }) => {
  function handleInputKeyDown(event) {
    const { key } = event

    switch (key) {
      case 'Backspace':
        event.stopPropagation()
        return handleDeleteText()
      case ' ':
        event.stopPropagation()
        return handleTextInput(key)
      default:
        break
      }

    if (/^.{1}$/.test(key)) {
      event.stopPropagation()
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
