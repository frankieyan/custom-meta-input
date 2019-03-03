import React from 'react'
import styled from 'styled-components'

const MetaMenu = styled.ul`
  position: absolute;
  display: ${({ open }) => open ? 'block' : 'none'};
  width: 100%;
  max-height: 300px;
  top: 48px;
  padding: 0;
  margin: 0;
  overflow: auto;
  border: 1px solid lightgrey;
  list-style: none;
`

const MetaMenuItem = styled.li`
  border-bottom: 1px solid lightgrey;
  padding: 8px;
  cursor: pointer;

  &:hover, &:focus {
    outline: 0;
    background: whitesmoke;
  }

  &:last-child {
    border-bottom: 0;
  }
`

const Menu = ({ open, onSelect, meta = [] }) => {
  function handleSelect({ type, value }) {
    return () => onSelect(`{{${type}__${value}}}`)
  }

  function handleKeyUp({ type, value }) {
    return event => {
      if (event.key === 'Enter') {
        onSelect(`{{${type}__${value}}}`)
      }
    }
  }

  return (
    <MetaMenu open={open}>
      {
        meta.map(({ type, value }, index) => (
          <MetaMenuItem
            key={index}
            tabIndex="0"
            onClick={handleSelect({ type, value })}
            onKeyUp={handleKeyUp({ type, value })}
          >
            {type} <strong>{value}</strong>
          </MetaMenuItem>
        ))
      }
    </MetaMenu>
  )
}

export { Menu }
