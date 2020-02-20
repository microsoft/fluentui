import * as React from 'react'
import { Button } from '@fluentui/react'

const ButtonGroupCircularExampleShorthand = () => (
  <Button.Group
    circular
    buttons={[
      { key: 'emoji', icon: 'emoji', primary: true, title: 'Emoji' },
      { key: 'translation', icon: 'translation', title: 'Translation' },
      { key: 'play', icon: 'play', primary: true, title: 'Play' },
    ]}
  />
)

export default ButtonGroupCircularExampleShorthand
