function _lookupBrace(value, brace, currentIndex) {
  const isStartBrace = brace === '{'
  const currentIndexIsPartOfBrace = isStartBrace
    ? value[currentIndex] === brace && value[currentIndex + 1] === brace
    : value[currentIndex] === brace && value[currentIndex - 1] === brace
  const nextIndex = isStartBrace ? currentIndex - 1 : currentIndex + 1

  return !value[nextIndex]
    ? (currentIndexIsPartOfBrace && currentIndex)
    : (currentIndexIsPartOfBrace && currentIndex) || _lookupBrace(value, brace, nextIndex)
}

function _parseMeta(meta) {
  const parsedParts = meta
    .replace(/{|}/g, '')
    .split('__')

  return { type: parsedParts[0], value: parsedParts[1] }
}

function removeMetaAtGivenIndex(value, index) {
  const start = _lookupBrace(value, '{', index)
  const end = _lookupBrace(value, '}', index)

  if (typeof start !== 'number' || typeof end !== 'number') {
    return value
  }

  return value.slice(0, start) + value.slice(end + 1)
}

function splitTextMetaNodes(value = '') {
  function findNextTextMetaNode(accumulator, source) {
    if (source.length === 0) {
      return accumulator
    }

    const start = _lookupBrace(source, '{', 0)
    const end = _lookupBrace(source, '}', 0)

    if (typeof start !== 'number' || typeof end !== 'number') {
      return findNextTextMetaNode([
          ...accumulator.slice(0, -1),
          (accumulator[accumulator.length - 1] || '') + source[0],
        ],
        source.slice(1),
      )
    }
    return findNextTextMetaNode([
        ...accumulator,
        _parseMeta(source.slice(start, end + 1).join('')),
        '',
      ],
      source.slice(end + 1),
    )
  }

  return findNextTextMetaNode([], value.split(''))
    .filter(node => node !== '')
}

/**
 * Recursively find the top-level Pill or TextNode element that the current selected element belongs to
 * @param {Element} element
 * @returns {Element}
 */
function _findPillOrTextNode(element) {
  if (element.hasAttribute && element.hasAttribute('data-input-element') || !element.parentElement) {
    return
  }

  return element.hasAttribute && (element.hasAttribute('data-pill-element') || element.hasAttribute('data-text-node-element'))
    ? element
    : _findPillOrTextNode(element.parentElement)
}

/**
 * Returns the Pill or TextNode elements at the beginning (anchor) and end (focus) of the selection
 *
 * @param {{ anchorNode: Element, focusNode: Element }} param0
 * @returns {{ anchor: Element, focus: Element }}
 */
function parseSelection({ anchorNode, focusNode }) {
  return {
    anchor: _findPillOrTextNode(anchorNode),
    focus: _findPillOrTextNode(focusNode),
  }
}

/**
 * Returns an array containing the start, end items and all elements in-between
 * @param {{ start: Element, end: Element, list: Element[] }}} param0
 * @returns {{ anchorIsFirst: boolean | null, elementsBetween: Element[] }}
 */
function getElementsBetween({ start, end, list }) {
  const startIndex = list.indexOf(start)
  const endIndex = list.indexOf(end)

  if (startIndex === -1 || endIndex === -1) {
    return { anchorIsFirst: null, elementsBetween: [] }
  }

  if (startIndex === endIndex) {
    return { anchorIsFirst: null, elementsBetween: [list[startIndex]] }
  }

  const anchorIsFirst = startIndex < endIndex

  const elementsBetween = anchorIsFirst
    ? list.slice(startIndex, endIndex + 1)
    : list.slice(endIndex, startIndex + 1)

  return { anchorIsFirst, elementsBetween }
}

/**
 * Extract the partially selected text based on the provided selection anchor and focus
 * @param {{
 *  anchorIsFirst: boolean,
 *  currentIndex: number,
 *  totalSelectedElements: number,
 *  fullText: string,
 *  anchorOffset: number,
 *  focusOffset: number,
 * }} param0
 * @returns string
 */
function getPartiallySelectedText({ anchorIsFirst, currentIndex, totalSelectedElements, fullText, anchorOffset, focusOffset }) {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalSelectedElements - 1
  const isOnlyElement = isFirst && isLast
  const isAnchor = anchorIsFirst ? isFirst : isLast
  const isFocus = anchorIsFirst ? isLast : isFirst

  if (isOnlyElement) {
    return anchorOffset > focusOffset
      ? fullText.slice(focusOffset, anchorOffset)
      : fullText.slice(anchorOffset, focusOffset)
  }

  if (isAnchor) {
    return isFirst
      ? fullText.slice(anchorOffset)
      : fullText.slice(0, anchorOffset)
  }

  if (isFocus) {
    return isFirst
      ? fullText.slice(focusOffset)
      : fullText.slice(0, focusOffset)
  }
}

export {
  removeMetaAtGivenIndex,
  splitTextMetaNodes,
  parseSelection,
  getElementsBetween,
  getPartiallySelectedText,
}
