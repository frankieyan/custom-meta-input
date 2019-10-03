import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { TEXT_NODE_IDENTIFIER } from './input.constants'

const TextNode = styled(forwardRef(({ children, ...rest }, ref) => (
  <span {...{ [TEXT_NODE_IDENTIFIER]: true }} ref={ref} {...rest}>
    {children}
  </span>
)))`
  white-space: pre;
`

export { TextNode }
