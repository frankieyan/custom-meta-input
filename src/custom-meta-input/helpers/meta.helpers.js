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

function splitTextMetaNodes(value) {
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

export {
  removeMetaAtGivenIndex,
  splitTextMetaNodes,
}
