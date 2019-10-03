import { PILL_NODE_IDENTIFIER, TEXT_NODE_IDENTIFIER } from '../input.constants'

function getSelectedNodes({ availableElements, availableNodes }) {
  if (!window.getSelection || window.getSelection().isCollapsed) {
    return []
  }

  const { anchorNode, focusNode, focusOffset, anchorOffset } = window.getSelection()
  const anchorElement = _findPillOrTextNode(anchorNode)
  const focusElement = _findPillOrTextNode(focusNode)
  const elementBetweenOptions = { start: anchorElement, end: focusElement, list: availableElements }
  const { anchorIsFirst, elementsBetween } = _getElementsBetween(elementBetweenOptions)
  const currentSelectedIndexes = elementsBetween.map(selected => availableElements.indexOf(selected))
  const currentSelectedNodes = currentSelectedIndexes.map(index => availableNodes[index])

  return currentSelectedNodes.map((node, index, list) => {
    const data = typeof node === 'string'
      ? _getPartiallySelectedTextData({
          anchorIsFirst,
          currentIndex: index,
          totalSelectedElements: list.length,
          fullText: node,
          anchorOffset,
          focusOffset,
        })
      : node

    return {
      ...data,
      index: currentSelectedIndexes[index],
    }
  })
}

/**
 * Recursively find the top-level Pill or TextNode element that the current selected element belongs to
 * @param {Element} element
 * @returns {Element}
 */
function _findPillOrTextNode(element) {
  if (!element.parentElement) {
    return
  }

  return element.hasAttribute && (element.hasAttribute(PILL_NODE_IDENTIFIER) || element.hasAttribute(TEXT_NODE_IDENTIFIER))
    ? element
    : _findPillOrTextNode(element.parentElement)
}

/**
 * Returns an array containing the start, end items and all elements in-between
 * @param {{ start: Element, end: Element, list: Element[] }}} param0
 * @returns {{ anchorIsFirst: boolean | null, elementsBetween: Element[] }}
 */
function _getElementsBetween({ start, end, list }) {
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
 * Extract the partially selected text and provide data like start/end indices based on the provided selection anchor and focus
 * @param {{
  *  anchorIsFirst: boolean,
  *  currentIndex: number,
  *  totalSelectedElements: number,
  *  fullText: string,
  *  anchorOffset: number,
  *  focusOffset: number,
  * }} param0
  * @returns {{ partial: boolean, rawValue: string, startIndex: number, endIndex: number, index: number }}
  */
 function _getPartiallySelectedTextData({ anchorIsFirst, currentIndex, totalSelectedElements, fullText, anchorOffset, focusOffset }) {
   const isFirst = currentIndex === 0
   const isLast = currentIndex === totalSelectedElements - 1
   const isOnlyElement = isFirst && isLast
   const isAnchor = anchorIsFirst ? isFirst : isLast
   const isFocus = anchorIsFirst ? isLast : isFirst
   let startIndex = 0
   let endIndex = 0

   if (isOnlyElement) {
     const focusIsFirst = anchorOffset > focusOffset
     startIndex = focusIsFirst ? focusOffset : anchorOffset
     endIndex = focusIsFirst ? anchorOffset : focusOffset
   } else if (isAnchor) {
     startIndex = isFirst ? anchorOffset : 0
     endIndex = isFirst ? fullText.length : anchorOffset
   } else if (isFocus) {
     startIndex = isFirst ? focusOffset : 0
     endIndex = isFirst ? fullText.length : focusOffset
   } else {
     startIndex = 0
     endIndex = fullText.length
   }

   return { partial: startIndex > 0 || endIndex < fullText.length, rawValue: fullText.slice(startIndex, endIndex), startIndex, endIndex }
 }

export {
  getSelectedNodes,
}
