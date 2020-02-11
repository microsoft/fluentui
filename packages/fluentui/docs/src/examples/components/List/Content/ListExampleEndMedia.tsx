import * as React from 'react'
import { List } from '@fluentui/react'

const ellipsis = <span>&hellip;</span>

const ListExample = () => (
  <List>
    <List.Item
      content="Program the sensor to the SAS alarm through the haptic SQL card!"
      endMedia={ellipsis}
      selectable
    />
    <List.Item
      content="Use the online FTP application to input the multi-byte application!"
      endMedia={ellipsis}
      selectable
    />
    <List.Item
      content="The GB pixel is down, navigate the virtual interface!"
      endMedia={ellipsis}
      selectable
    />
  </List>
)

export default ListExample
