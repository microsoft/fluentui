import * as React from 'react'
import { List, Status } from '@fluentui/react'

const items = [
  {
    key: 'irving',
    media: <Status state="error" icon="error" />,
    header: 'Irving Kuhic',
  },
  {
    key: 'skyler',
    media: <Status state="success" icon="icon-checkmark" />,
    header: 'Skyler Parks',
  },
  {
    key: 'dante',
    media: <Status />,
    header: 'Dante Schneider',
  },
]

const ListExampleSelectable = () => (
  <List selectable defaultSelectedIndex={0} items={items} horizontal />
)

export default ListExampleSelectable
