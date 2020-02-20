import { createCallbackLogFormatter } from '@fluentui/code-sandbox'
import { useLogKnob } from '@fluentui/docs-components'
import { Toolbar } from '@fluentui/react'
import * as React from 'react'

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)

  const onItemClick = useLogKnob('onItemClick', null, createCallbackLogFormatter(['content']))
  const onMenuOpenChange = useLogKnob(
    'onMenuOpenChange',
    (e, { menuOpen }) => setMenuOpen(menuOpen),
    createCallbackLogFormatter(['menuOpen']),
  )

  return (
    <Toolbar
      aria-label="Toolbar can contain a menu"
      items={[
        {
          key: 'more',
          icon: 'more',
          active: menuOpen,
          title: 'More',
          menu: {
            items: [
              { key: 'play', content: 'Play', icon: 'play' },
              { key: 'pause', content: 'Pause', icon: 'pause' },
              { key: 'divider', kind: 'divider' },
              'Without icon',
            ],
            onItemClick,
          },
          menuOpen,
          onMenuOpenChange,
        },
      ]}
    />
  )
}

export default ToolbarExampleMenuShorthand
