import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Pill = styled(forwardRef(({ type, value, className, selected, ...rest }, ref) => (
  <span className={className} ref={ref} {...rest}>
    <span>{type}</span>
    <strong>{value}</strong>
  </span>
)))`
  display: inline-block;
  padding: 2px 8px;
  border: 2px solid ${({ type, value }) => (!type || !value) ? 'red' : 'green'};
  border-radius: 16px;
  color: white;
  background: ${({ type, value }) => (!type || !value) ? 'red' : 'green'};
  white-space: nowrap;

  ${({ selected, type, value }) => selected
    ? `
      background-color: ${(!type || !value) ? 'lightcoral' : 'lightgreen'};
    `
    : ''
  }

  > *::selection {
    display: none;
  }

  :not(:last-child) {
    margin-right: 4px;
  }

  span:not(:empty) + strong:not(:empty) {
    margin-left: 8px;
  }
`

export { Pill }
