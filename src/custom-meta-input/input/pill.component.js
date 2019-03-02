import React from 'react'
import styled from 'styled-components'


const Pill = styled(({ type, value, className }) => (
  <span className={className}>
    <span>{type}</span>
    <strong>{value}</strong>
  </span>
))`
  display: inline-block;
  padding: 2px 8px;
  margin-right: 4px;
  border: 2px solid ${({ type, value }) => (!type || !value) ? 'red' : 'green'};
  border-radius: 16px;
  color: white;
  background: ${({ type, value }) => (!type || !value) ? 'red' : 'green'};
  white-space: nowrap;

  span:not(:empty) + strong:not(:empty) {
    margin-left: 8px;
  }
`

export { Pill }
