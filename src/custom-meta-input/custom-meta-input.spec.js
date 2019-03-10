import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { CustomMetaInput } from './custom-meta-input.component'

describe('<CustomMetaInput> component', () => {
  const data = [
    { type: 'Birthday', value: '03/14/2015' },
    { type: 'Breed', value: 'Poodle' },
  ]

  test('renders a focusable element and a button element', () => {
    const { container } = render(<CustomMetaInput />)
    const inputElement = container.firstChild.firstChild
    const button = inputElement.nextSibling

    inputElement.focus()

    expect(inputElement).toHaveFocus()
    expect(button.nodeName).toBe('BUTTON')
  })

  test('text can be entered into the component', () => {
    const { container } = render(<CustomMetaInput />)
    const inputElement = container.firstChild.firstChild

    fireEvent.keyDown(inputElement, { key: 'H' })
    fireEvent.keyDown(inputElement, { key: 'i' })

    expect(inputElement).toHaveTextContent('Hi')
  })

  test('entering text calls the onChange handler with the new value', () => {
    const handler = jest.fn()
    const { container, getByText } = render(<CustomMetaInput metaOptions={data} onChange={handler} />)
    const inputElement = container.firstChild.firstChild

    fireEvent.keyDown(inputElement, { key: 'C' })
    fireEvent.keyDown(inputElement, { key: 'H' })
    fireEvent.keyDown(inputElement, { key: 'E' })
    fireEvent.keyDown(inputElement, { key: 'W' })
    fireEvent.keyDown(inputElement, { key: 'I' })
    fireEvent.keyDown(inputElement, { key: 'E' })

    expect(handler).lastCalledWith('CHEWIE')
  })

  test('clicking on the button opens the menu', () => {
    const { container, getByText } = render(<CustomMetaInput metaOptions={data} />)
    const inputElement = container.firstChild.firstChild
    const button = inputElement.nextSibling

    expect(getByText('Birthday')).not.toBeVisible()
    expect(getByText('Breed')).not.toBeVisible()

    fireEvent.click(button)

    expect(getByText('Birthday')).toBeVisible()
    expect(getByText('Breed')).toBeVisible()
  })

  test('clicking away from the component closes the menu', () => {
    const { container, getByText } = render(<CustomMetaInput metaOptions={data} />)
    const inputElement = container.firstChild.firstChild
    const button = inputElement.nextSibling

    fireEvent.click(button)

    expect(getByText('Birthday')).toBeVisible()
    expect(getByText('Breed')).toBeVisible()

    fireEvent.click(container)

    expect(getByText('Birthday')).not.toBeVisible()
    expect(getByText('Breed')).not.toBeVisible()
  })

  test('selecting a meta from the menu adds it to the input element', () => {
    const { container, getByText } = render(<CustomMetaInput metaOptions={data} />)
    const inputElement = container.firstChild.firstChild
    const button = inputElement.nextSibling

    fireEvent.click(button)
    fireEvent.click(getByText('Birthday'))

    expect(inputElement).toHaveTextContent('Birthday03/14/2015')
  })

  test('selecting a meta from the menu calls the onChange handler with the interpolation string', () => {
    const handler = jest.fn()
    const { container, getByText } = render(<CustomMetaInput metaOptions={data} onChange={handler} />)
    const inputElement = container.firstChild.firstChild
    const button = inputElement.nextSibling

    fireEvent.click(button)
    fireEvent.click(getByText('Birthday'))

    expect(handler).lastCalledWith('{{Birthday__03/14/2015}}')
  })

  test('hitting backspace deletes text and meta from the component', () => {
    const { container, getByText } = render(<CustomMetaInput metaOptions={data} />)
    const inputElement = container.firstChild.firstChild
    const button = inputElement.nextSibling

    fireEvent.keyDown(inputElement, { key: 'Y' })
    fireEvent.keyDown(inputElement, { key: 'o' })

    fireEvent.click(button)
    fireEvent.click(getByText('Breed'))

    expect(inputElement).toHaveTextContent('YoBreedPoodle')

    fireEvent.keyDown(inputElement, { key: 'Backspace' })
    expect(inputElement).toHaveTextContent('Yo')

    fireEvent.keyDown(inputElement, { key: 'Backspace' })
    fireEvent.keyDown(inputElement, { key: 'Backspace' })
    expect(inputElement).toHaveTextContent('')
  })
})
