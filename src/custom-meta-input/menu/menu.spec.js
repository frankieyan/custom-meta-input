import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { Menu } from './menu.component'

describe('<Menu> component', () => {
  describe('when the `open` prop is false', () => {
    test('renders a list item but is hidden from view', () => {
      const { container } = render(<Menu open={false} />)

      expect(container.firstChild.nodeName).toBe('UL')
      expect(container.firstChild).toBeInTheDocument()
      expect(container.firstChild).not.toBeVisible()
    })
  })

  describe('when the `open` prop is true', () => {
    test('renders a list item', () => {
      const { container } = render(<Menu open />)

      expect(container.firstChild).toBeVisible()
    })
  })

  describe('when data is provided to the `meta` prop', () => {
    const data = [
      { type: 'To', value: 'Major Tom' },
      { type: 'From', value: 'Ground Control' },
    ]

    test('renders a list from the given data', () => {
      const { getByText } = render(<Menu open meta={data} />)

      // Note: There is a plan to query nested text content via *ByText selectors,
      // but for now they'd need to be retrieved individually.
      // See: https://github.com/kentcdodds/dom-testing-library/issues/201
      expect(getByText('To')).toHaveTextContent('To Major Tom')
      expect(getByText('From')).toHaveTextContent('From Ground Control')
    })

    test('when a menu item is clicked on, fires the onSelect callback with the item\' interpolation string', () => {
      const onSelect = jest.fn()

      const { getByText } = render(<Menu open meta={data} onSelect={onSelect} />)

      fireEvent.click(getByText('To'))
      expect(onSelect).lastCalledWith('{{To__Major Tom}}')

      fireEvent.click(getByText('From'))
      expect(onSelect).lastCalledWith('{{From__Ground Control}}')
    })

    test('when a menu item is focused on, the enter key fires the onSelect callback with the item\' interpolation string', () => {
      const onSelect = jest.fn()

      const { getByText } = render(<Menu open meta={data} onSelect={onSelect} />)

      fireEvent.keyUp(getByText('To'), { key: 'Enter' })
      expect(onSelect).lastCalledWith('{{To__Major Tom}}')

      fireEvent.keyUp(getByText('From'), { key: 'Enter' })
      expect(onSelect).lastCalledWith('{{From__Ground Control}}')
    })
  })
})
