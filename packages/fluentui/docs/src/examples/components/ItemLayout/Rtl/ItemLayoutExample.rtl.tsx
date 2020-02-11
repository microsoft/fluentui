import * as React from 'react'
import { ItemLayout, Icon } from '@fluentui/react'

const ItemLayoutExampleRtlShorthand = () => (
  <>
    <ItemLayout
      content="Welcome"
      contentMedia={<Icon name="mention" />}
      header="Alice"
      headerMedia="Yesterday"
      media={<Icon name="error" />}
    />
    <ItemLayout
      content="Welcome"
      contentMedia={<Icon name="mention" />}
      header="הויפט זייט"
      headerMedia="Yesterday"
      media={<Icon name="error" />}
    />
  </>
)

export default ItemLayoutExampleRtlShorthand
