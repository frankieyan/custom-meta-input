import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { Input } from './input.component'

describe('<Input> component', () => {
  beforeEach(() => {
    window.getSelection = jest.fn()
  })

  test('renders a focusable element', () => {
    const { container } = render(<Input />)

    expect(container.firstChild).toBeVisible()
    container.firstChild.focus()

    expect(container.firstChild).toHaveFocus()
  })

  test('displays the text provided through the value prop', () => {
    const { getByText } = render(<Input value="Major Tom" />)

    expect(getByText('Major Tom')).toBeVisible()
  })

  test('displays meta interpolations in a pill', () => {
    const { container, getByText } = render(<Input value="I'm listening to {{Song Name__Space Oddity}} right now" />)

    expect(container.firstChild).toHaveTextContent('I\'m listening to Song NameSpace Oddity right now')
    expect(getByText('Song Name').parentElement).toHaveTextContent('Song NameSpace Oddity')
    expect(getByText('Song Name').parentElement).toHaveStyle('background-color: green')
  })

  test('displays meta interpolations with invalid data in a red pill', () => {
    const { container, getByText } = render(<Input value="I'm listening to {{foo}} right now" />)

    expect(container.firstChild).toHaveTextContent('I\'m listening to foo right now')
    expect(getByText('foo').parentElement).toHaveStyle('background-color: red')
  })

  describe('when backspace is hit', () => {
    test('the last character is deleted', () => {
      const handler = jest.fn()
      const { container } = render(<Input value="I'm feeling good" onChange={handler} />)

      fireEvent.keyDown(container.firstChild, { key: 'Backspace' })

      expect(handler).lastCalledWith('I\'m feeling goo')
    })

    test('the last meta interpolation is deleted', () => {
      const handler = jest.fn()
      const { container } = render(<Input value="I'm feeling {{feeling__good}}" onChange={handler} />)

      fireEvent.keyDown(container.firstChild, { key: 'Backspace' })

      expect(handler).lastCalledWith('I\'m feeling ')
    })
  })

  describe('when a character is entered', () => {
    test('punctuations are added', () => {
      const handler = jest.fn()
      const { container } = render(<Input value="I'm feeling good" onChange={handler} />)

      fireEvent.keyDown(container.firstChild, { key: '!' })
      expect(handler).lastCalledWith('I\'m feeling good!')
    })

    test('alphabetical characters are added', () => {
      const handler = jest.fn()
      const { container } = render(<Input value="I'm feeling good" onChange={handler} />)

      fireEvent.keyDown(container.firstChild, { key: 's' })
      expect(handler).lastCalledWith('I\'m feeling goods')
    })

    test('numbers characters are added', () => {
      const handler = jest.fn()
      const { container } = render(<Input value="I'm feeling good" onChange={handler} />)

      fireEvent.keyDown(container.firstChild, { key: '0' })
      expect(handler).lastCalledWith('I\'m feeling good0')
    })

    test('spaces are added', () => {
      const handler = jest.fn()
      const { container } = render(<Input value="I'm feeling good" onChange={handler} />)

      fireEvent.keyDown(container.firstChild, { key: ' ' })
      expect(handler).lastCalledWith('I\'m feeling good ')
    })
  })

  describe('when content is selected', () => {
    test('pills are rendered differently', () => {
      const { getByText } = render(<Input value="I'm listening to {{Song Name__Space Oddity}} right now" />)
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: getByText('right now'),
        focusNode: getByText('I\'m listening to'),
        anchorOffset: 10,
        focusOffset: 0,
      })

      fireEvent.mouseMove(getByText('Space Oddity'))

      expect(getByText('Song Name').parentElement).toHaveStyle('background-color: lightgreen')
    })

    test('the delete key removes the selected elements', () => {
      const handler = jest.fn()
      const { getByText, container } = render(<Input value="I'm listening to {{Song Name__Space Oddity}} right now, and I give it a {{Rating__5}}" onChange={handler} />)
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: getByText('Rating'),
        focusNode: getByText('I\'m listening to'),
        anchorOffset: 5,
        focusOffset: 13,
        removeAllRanges: jest.fn(),
      })

      fireEvent.mouseMove(getByText('Space Oddity'))
      fireEvent.keyDown(container.firstChild, { key: 'Backspace' })

      expect(handler).lastCalledWith('I\'m listening')
    })
  })
})
