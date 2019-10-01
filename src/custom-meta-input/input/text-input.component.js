import React from 'react'
import styled, { keyframes } from 'styled-components'

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
      content: ${({ hasSelection }) => hasSelection ? 'none' : '\'\''};
      height: 14px;
      width: 1px;
      background: black;

      animation: ${caretAnimation} 1s linear infinite;
    }
  }
`

export { TextInput }
