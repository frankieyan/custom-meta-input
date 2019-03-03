import React from 'react'
import styled from 'styled-components'

const MetaMenu = styled.ul`
  position: absolute;
  display: ${({ open }) => open ? 'block' : 'none'};
  width: 100%;
  min-height: 120px;
  top: 48px;
  padding: 0;
  margin: 0;
  border: 1px solid lightgrey;
  list-style: none;
`

const MetaMenuItem = styled.li`
  border-bottom: 1px solid lightgrey;
  padding: 8px;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }
`

const Menu = ({ open, onSelect, meta = [] }) => (
  <MetaMenu open={open}>
    {
      meta.map(({ type, value }, index) => (
        <MetaMenuItem
          key={index}
          onClick={() => onSelect(`{{${type}__${value}}}`)}
        >
          {type} {value}
        </MetaMenuItem>
      ))
    }
  </MetaMenu>
)

export { Menu }
