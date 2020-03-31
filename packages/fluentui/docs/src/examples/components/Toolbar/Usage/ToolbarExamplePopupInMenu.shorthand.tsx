import * as React from 'react';
import { Toolbar, ToolbarItemShorthandKinds, Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-northstar';

const ToolbarExamplePopupInMenu = () => {
  const [menu1Open, setMenu1Open] = React.useState(false);
  const [menu2Open, setMenu2Open] = React.useState(false);

  return (
    <Toolbar
      aria-label="Popup in menu"
      items={[
        {
          key: 'menu1',
          icon: 'more',
          active: menu1Open,
          title: 'More',
          menu: [
            {
              key: 'popup',
              content: 'Open Popup',
              popup: <Input icon={<SearchIcon />} placeholder="Search..." />,
            },
          ],
          menuOpen: menu1Open,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenu1Open(menuOpen);
          },
        },
        {
          key: 'italic',
          kind: 'toggle' as ToolbarItemShorthandKinds,
          icon: { name: 'italic', outline: true },
          title: 'Italic',
        },
        {
          key: 'menu2',
          icon: 'more',
          active: menu2Open,
          title: 'More',
          menu: [
            {
              key: 'popup',
              content: 'Open Popup',
              popup: <Input icon={<SearchIcon />} placeholder="Search..." />,
            },
            { key: 'about', content: 'About...' },
          ],
          menuOpen: menu2Open,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenu2Open(menuOpen);
          },
        },
      ]}
    />
  );
};

export default ToolbarExamplePopupInMenu;
