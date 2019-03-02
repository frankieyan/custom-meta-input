import * as metaHelpers from './meta.helpers'

describe('Meta helpers', () => {
  describe('removeMetaAtGivenIndex', () => {
    test('returns the given string without the meta if the given index is part of the meta', () => {
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 4)).toBe('abc ')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 5)).toBe('abc ')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 6)).toBe('abc ')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 7)).toBe('abc ')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 8)).toBe('abc ')

      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 16)).toBe('abc ')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 17)).toBe('abc ')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 18)).toBe('abc ')
    })

    test('returns false if the given index is not part of a meta', () => {
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 0)).toBe('abc {{type__value}}')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 1)).toBe('abc {{type__value}}')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 2)).toBe('abc {{type__value}}')
      expect(metaHelpers.removeMetaAtGivenIndex('abc {{type__value}}', 3)).toBe('abc {{type__value}}')
      expect(metaHelpers.removeMetaAtGivenIndex('abcdef', 4)).toBe('abcdef')
    })
  })

  describe('splitTextMetaNodes', () => {
    describe('when the meta string is at the end of the given string', () => {
      test('able to split the given string into array of text values and metas', () => {
        expect(metaHelpers.splitTextMetaNodes('abc {{type__value}}')).toEqual(['abc ', { type: 'type', value: 'value' }])
      })
    })

    describe('when the meta string is at the beginning of the given string', () => {
      test('able to split the given string into array of text values and metas', () => {
        expect(metaHelpers.splitTextMetaNodes('{{type__value}} abc')).toEqual([{ type: 'type', value: 'value' }, ' abc'])
      })
    })

    describe('when there are multiple meta strings', () => {
      test('able to split the given string into array of text values and metas', () => {
        expect(metaHelpers.splitTextMetaNodes('{{type__value}} abc {{type__value}}{{type__value}}abc'))
          .toEqual([
            { type: 'type', value: 'value' },
            ' abc ',
            { type: 'type', value: 'value' },
            { type: 'type', value: 'value' },
            'abc',
          ])
      })
    })
  })
})
