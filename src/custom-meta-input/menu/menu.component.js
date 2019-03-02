import React from 'react'
import styled from 'styled-components'

const MetaMenu = styled.ul`
  position: absolute;
  display: ${({ open }) => open ? 'block' : 'none'};
  min-width: 280px;;
  max-width: 100%;
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

  &:last-child {
    border-bottom: 0;
  }
`

const Menu = ({ open }) => (
  <MetaMenu open={open}>
    <MetaMenuItem>Artist name Commodores</MetaMenuItem>
    <MetaMenuItem>Song title Thank you</MetaMenuItem>
    <MetaMenuItem>Rating 5</MetaMenuItem>
  </MetaMenu>
)

export { Menu }
