import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';
import { CustomMetaInput } from './custom-meta-input.component'

const InputContainer = styled.section`
  display: flex;
  margin: 40px 80px;
  justify-content: center;
`

storiesOf('Custom Meta Input', module)
  .addDecorator(withKnobs)
  .add('Basic Usage', () => {
    const metaOptions = object('metaOptions', [
      { type: 'Artist name', value: 'Commodores' },
      { type: 'Song title', value: 'Thank you' },
      { type: 'Rating', value: 5 },
    ])

    return (
      <InputContainer>
        <CustomMetaInput metaOptions={metaOptions} onChange={action('onChange')} />
      </InputContainer>
    )
  }
)
