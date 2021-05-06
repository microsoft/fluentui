import * as React from 'react';
import { Toolbar } from '@fluentui/react-northstar';

export const selectors = {
  toolbarMenuId: 'toolbarMenu',
  toolbarMenuSubmenuId: 'toolbarMenuSubmenu',
  moreButtonId: 'moreButton',
  playId: 'play',
  playVideoId: 'playVideo',
  hdId: 'hd',
};

const ToolbarExampleMenuWithSubmenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onMenuOpenChange = (e, { menuOpen }) => setMenuOpen(menuOpen);

  return (
    <Toolbar
      items={[
        {
          id: selectors.moreButtonId,
          key: 'more',
          icon: 'more',
          active: menuOpen,
          menu: {
            id: selectors.toolbarMenuId,
            items: [
              {
                key: 'play',
                content: 'Play',
                icon: 'play',
                id: selectors.playId,
                menu: {
                  id: selectors.toolbarMenuSubmenuId,
                  items: [
                    'Play with audio',
                    {
                      content: 'Play with video',
                      key: 'playVideo',
                      id: selectors.playVideoId,
                      menu: [{ content: 'HD', id: selectors.hdId, key: 'HD' }, 'Full HD'],
                    },
                  ],
                },
              },
              { key: 'pause', content: 'Pause', icon: 'pause' },
              { key: 'divider', kind: 'divider' },
              'Without icon',
            ],
          },
          menuOpen,
          onMenuOpenChange,
        },
      ]}
    />
  );
};

export default ToolbarExampleMenuWithSubmenuShorthand;
