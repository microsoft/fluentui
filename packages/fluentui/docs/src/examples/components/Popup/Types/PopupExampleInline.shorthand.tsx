import * as React from 'react'
import { Button, Popup } from '@fluentui/react'

const PopupExampleInline = () => (
  <Popup
    trigger={<Button icon="more" title="Show popup" />}
    content="This popup is rendered next to the trigger."
    inline
  />
)

export default PopupExampleInline
