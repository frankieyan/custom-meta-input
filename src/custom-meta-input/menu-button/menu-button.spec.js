import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { MenuButton } from './menu-button.component'

describe('<MenuButton> component', () => {
  test('renders a button element', () => {
    const { container } = render(<MenuButton />)

    expect(container.firstChild.nodeName).toBe('BUTTON')
  })

  test('contains a svg icon', () => {
    const { container } = render(<MenuButton />)
    const icon = container.firstChild.querySelector('svg')

    expect(icon).toBeInTheDocument()
  })

  test('fires the provided onClick handler when clicked', () => {
    const handler = jest.fn()
    const { container } = render(<MenuButton onClick={handler} />)

    fireEvent.click(container.firstChild)

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
