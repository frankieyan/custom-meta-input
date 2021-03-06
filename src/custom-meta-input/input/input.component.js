import React, { useRef, useState } from 'react'
import { Pill } from './pill.component'
import { TextNode } from './text-node.component'
import { TextInput } from './text-input.component'
import {
  removeMetaAtGivenIndex,
  splitTextMetaNodes,
} from '../helpers/meta.helpers'
import { getSelectedNodes } from './events/selection'

const Input = ({ value, onChange }) => {
  function handleInputKeyDown(event) {
    const { key } = event

    switch (key) {
      case 'Backspace':
        event.stopPropagation()
        return handleDeleteText()
      case ' ':
        event.stopPropagation()
        return handleTextInput(key)
      default:
        break
      }

    if (/^.{1}$/.test(key)) {
      event.stopPropagation()
      return handleTextInput(key)
    }
  }

  function handleTextInput(key) {
    const previousValue = value || ''
    onChange(previousValue + key)
  }

  function handleDeleteText() {
    if (selectedNodeData.length) {
      const textMetaNodes = splitTextMetaNodes(value)
      const newValue = textMetaNodes.map((node, index) => {
        const selectedData = selectedNodeData.find(selected => index === selected.index)

        if (typeof selectedData === 'undefined') {
          return node.rawValue || node
        }

        if (selectedData && !selectedData.partial) {
          return ''
        }

        return node.substring(0, selectedData.startIndex) + node.substring(selectedData.endIndex)
      }).join('')

      onChange(newValue)
      return handleClearSelection()
    }

    const valueWithoutMeta = removeMetaAtGivenIndex(value, value.length - 1)

    onChange(
      value === valueWithoutMeta
        ? value.slice(0, -1)
        : valueWithoutMeta
    )
  }

  function handleClearSelection() {
    if (!window.getSelection) {
      return
    }

    window.getSelection().removeAllRanges()
    setSelectedNodeData([])
  }

  function handleSelection() {
    const selectedNodes = getSelectedNodes({ availableElements: currentTextMetaNodeRefs, availableNodes: splitTextMetaNodes(value) })
    setSelectedNodeData(selectedNodes)
  }

  const [selectedNodeData, setSelectedNodeData] = useState([])
  const textMetaNodes = splitTextMetaNodes(value)

  const currentTextMetaNodeRefs = useRef([]).current
  currentTextMetaNodeRefs.splice(0, currentTextMetaNodeRefs.length)

  return (
    <TextInput
      tabIndex="0"
      onKeyDown={handleInputKeyDown}
      onMouseDown={handleClearSelection}
      onMouseMove={handleSelection}
      onBlur={handleClearSelection}
      onDoubleClick={handleSelection}
      hasSelection={!!selectedNodeData.length}
    >
      {
        textMetaNodes.map((node, index) => {
          const { type, value: nodeValue } = node
          const setRef = ref => {
            if (ref !== null) {
              currentTextMetaNodeRefs.push(ref)
            }
          }

          const isSelected = selectedNodeData.find(nodeData => nodeData.index === index)

          return typeof node === 'object'
            ? <Pill key={index} type={type} value={nodeValue} ref={setRef} selected={isSelected} />
            : <TextNode key={index} ref={setRef}>{node}</TextNode>
        })
      }
    </TextInput>
  )
}

export { Input }
