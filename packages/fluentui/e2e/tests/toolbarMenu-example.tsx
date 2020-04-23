import * as React from 'react';
import { Toolbar, Button, toolbarMenuClassName, Ref } from '@fluentui/react-northstar';

export const selectors = {
  beforeToolbarId: 'before',
  afterToolbarId: 'after',
  triggerButtonId: 'trigger',
  menuItemButtonId: 'menu-button',
  toolbarMenu: toolbarMenuClassName,
};

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const buttonAfterToolbarRef = React.createRef<HTMLButtonElement>();

  return (
    <>
      <Button id={selectors.beforeToolbarId}>Before</Button>
      <Toolbar
        items={[
          {
            key: 'highlight',
            icon: 'highlight',
          },
          {
            key: 'more',
            icon: 'more',
            active: menuOpen,
            id: selectors.triggerButtonId,
            menu: {
              items: [
                {
                  key: 'play',
                  id: `${selectors.menuItemButtonId}-0`,
                  content: 'Play',
                  icon: 'play',
                  onClick: () => buttonAfterToolbarRef.current.focus(),
                },
                { key: 'pause', content: 'Pause', icon: 'pause' },
                { key: 'divider', kind: 'divider' },
                'Without icon',
              ],
            },
            menuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              setMenuOpen(menuOpen);
            },
          },
          {
            key: 'bold',
            icon: 'bold',
          },
        ]}
      />
      <Ref innerRef={buttonAfterToolbarRef}>
        <Button id={selectors.afterToolbarId}>After</Button>
      </Ref>
    </>
  );
};

export default ToolbarExampleMenuShorthand;
