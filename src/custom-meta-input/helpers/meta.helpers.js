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

function removeMetaAtGivenIndex(value, index) {
  const start = _lookupBrace(value, '{', index)
  const end = _lookupBrace(value, '}', index)

  if (typeof start !== 'number' || typeof end !== 'number') {
    return value
  }

  return value.slice(0, start) + value.slice(end + 1)
}

export {
  removeMetaAtGivenIndex,
}
