import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { getSelectedNodes } from './selection'
import { Pill } from '../pill.component'
import { TextNode } from '../text-node.component'

describe('#getSelectedNodes', () => {
  beforeEach(() => {
    window.getSelection = jest.fn()
  })

  test('returns an empty array when no text is selected', () => {
    window.getSelection.mockReturnValue({ isCollapsed: true })

    expect(getSelectedNodes({})).toEqual([])
  })

  describe('when only pills are present', () => {
    const nodes = [
      { type: 'Artist', value: 'Commodores' },
      { type: 'Song', value: 'Thank you' },
      { type: 'Rating', value: '5' },
    ]
    const markup = renderToStaticMarkup(
      <React.Fragment>
        {nodes.map(({ type, value }) => <Pill key={value} type={type} value={value} />)}
      </React.Fragment>
    )

    test('returns all pill data when all pills are selected', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[0],
        focusNode: fragment.childNodes[2],
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 0, type: 'Artist', value: 'Commodores' },
        { index: 1, type: 'Song', value: 'Thank you' },
        { index: 2, type: 'Rating', value: '5' },
      ])
    })

    test('returns only selected pill data when pills are partially selected', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[1],
        focusNode: fragment.childNodes[2],
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 1, type: 'Song', value: 'Thank you' },
        { index: 2, type: 'Rating', value: '5' },
      ])
    })

    test('returns only selected pill data in correct order when pills are selected in reverse', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[2],
        focusNode: fragment.childNodes[1],
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 1, type: 'Song', value: 'Thank you' },
        { index: 2, type: 'Rating', value: '5' },
      ])
    })
  })

  describe('when only text nodes are present', () => {
    const nodes = [
      'Hello',
      'Is it me you\'re looking for?',
      'Cause I wonder where you are',
    ]
    const markup = renderToStaticMarkup(
      <React.Fragment>
        {nodes.map(node => <TextNode key={node}>{node}</TextNode>)}
      </React.Fragment>
    )

    test('returns all textnode data when all textnodes are selected', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[0],
        focusNode: fragment.childNodes[2],
        anchorOffset: 0,
        focusOffset: 28,
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 0, rawValue: 'Hello', startIndex: 0, endIndex: 5, partial: false },
        { index: 1, rawValue: 'Is it me you\'re looking for?', startIndex: 0, endIndex: 28, partial: false },
        { index: 2, rawValue: 'Cause I wonder where you are', startIndex: 0, endIndex: 28, partial: false },
      ])
    })

    test('returns only selected textnode data when textnodes are partially selected', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[1],
        focusNode: fragment.childNodes[2],
        anchorOffset: 0,
        focusOffset: 28,
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 1, rawValue: 'Is it me you\'re looking for?', startIndex: 0, endIndex: 28, partial: false },
        { index: 2, rawValue: 'Cause I wonder where you are', startIndex: 0, endIndex: 28, partial: false },
      ])
    })

    test('returns correct start and end indices when text within textnodes are partially selected', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[0],
        focusNode: fragment.childNodes[1],
        anchorOffset: 2,
        focusOffset: 8,
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 0, rawValue: 'llo', startIndex: 2, endIndex: 5, partial: true },
        { index: 1, rawValue: 'Is it me', startIndex: 0, endIndex: 8, partial: true },
      ])
    })

    test('returns correct start and end indices when text within textnodes are partially selected in reverse', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[1],
        focusNode: fragment.childNodes[0],
        anchorOffset: 12,
        focusOffset: 1,
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 0, rawValue: 'ello', startIndex: 1, endIndex: 5, partial: true },
        { index: 1, rawValue: 'Is it me you', startIndex: 0, endIndex: 12, partial: true },
      ])
    })
  })

  describe('when there is a mix of text nodes and pills', () => {
    const nodes = [
      'Hello',
      { type: 'Artist', value: 'Lionel Richie' },
      'Is it me you\'re looking for?',
      { type: 'Song', value: 'Hello' },
      'Cause I wonder where you are',
      { type: 'Rating', value: '5' },
      'And I wonder what you do',
    ]
    const markup = renderToStaticMarkup(
      <React.Fragment>
        {nodes.map(node => typeof node === 'string'
          ? <TextNode key={node} >{node}</TextNode>
          : <Pill key={node.value} type={node.type} value={node.value} />
        )}
      </React.Fragment>
    )

    test('returns all data when all nodes are selected', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[0],
        focusNode: fragment.childNodes[6],
        anchorOffset: 0,
        focusOffset: 25,
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 0, rawValue: 'Hello', startIndex: 0, endIndex: 5, partial: false },
        { index: 1, type: 'Artist', value: 'Lionel Richie' },
        { index: 2, rawValue: 'Is it me you\'re looking for?', startIndex: 0, endIndex: 28, partial: false },
        { index: 3, type: 'Song', value: 'Hello' },
        { index: 4, rawValue: 'Cause I wonder where you are', startIndex: 0, endIndex: 28, partial: false },
        { index: 5, type: 'Rating', value: '5' },
        { index: 6, rawValue: 'And I wonder what you do', startIndex: 0, endIndex: 25, partial: false },
      ])
    })

    test('returns only selected data in correct order when nodes are selected partially in reverse', () => {
      const fragment = document.createElement('div')
      fragment.innerHTML = markup
      window.getSelection.mockReturnValue({
        isCollapsed: false,
        anchorNode: fragment.childNodes[4],
        focusNode: fragment.childNodes[2],
        anchorOffset: 10,
        focusOffset: 5,
      })

      const result = getSelectedNodes({
        availableElements: [...fragment.childNodes],
        availableNodes: nodes,
      })

      expect(result).toEqual([
        { index: 2, rawValue: ' me you\'re looking for?', startIndex: 5, endIndex: 28, partial: true },
        { index: 3, type: 'Song', value: 'Hello' },
        { index: 4, rawValue: 'Cause I wo', startIndex: 0, endIndex: 10, partial: true },
      ])
    })
  })

})
