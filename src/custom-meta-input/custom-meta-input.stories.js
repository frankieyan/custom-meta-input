import React from 'react'
import { storiesOf } from '@storybook/react'
import { CustomMetaInput } from './custom-meta-input.component'

storiesOf('Custom Meta Input', module)
  .add('Basic Usage', () => (
    <CustomMetaInput />
  )
)
