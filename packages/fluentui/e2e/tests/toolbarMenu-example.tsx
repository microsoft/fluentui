import * as React from 'react';
import { Toolbar, Button, ToolbarMenu } from '@fluentui/react';

export const selectors = {
  beforeToolbarId: 'before',
  afterToolbarId: 'after',
  triggerButtonId: 'trigger',
  toolbarMenu: ToolbarMenu.className
};

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <Button id={selectors.beforeToolbarId}>Before</Button>
      <Toolbar
        items={[
          {
            key: 'highlight',
            icon: 'highlight'
          },
          {
            key: 'more',
            icon: 'more',
            active: menuOpen,
            id: selectors.triggerButtonId,
            menu: {
              items: [
                { key: 'play', content: 'Play', icon: 'play' },
                { key: 'pause', content: 'Pause', icon: 'pause' },
                { key: 'divider', kind: 'divider' },
                'Without icon'
              ]
            },
            menuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMenuOpen(menuOpen);
            }
          },
          {
            key: 'bold',
            icon: 'bold'
          }
        ]}
      />
      <Button id={selectors.afterToolbarId}>After</Button>
    </>
  );
};

export default ToolbarExampleMenuShorthand;
