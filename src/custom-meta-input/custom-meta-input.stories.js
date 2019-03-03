import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';
import { CustomMetaInput } from './custom-meta-input.component'

storiesOf('Custom Meta Input', module)
  .addDecorator(withKnobs)
  .add('Basic Usage', () => {
    const metaOptions = object('metaOptions', [
      { type: 'Artist name', value: 'Commodores' },
      { type: 'Song title', value: 'Thank you' },
      { type: 'Rating', value: 5 },
    ])

    return (
      <CustomMetaInput metaOptions={metaOptions} onChange={action('onChange')} />
    )
  }
)
