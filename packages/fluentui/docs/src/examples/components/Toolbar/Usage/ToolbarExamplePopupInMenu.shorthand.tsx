import * as React from 'react';
import { Toolbar, Input } from '@fluentui/react-northstar';
import { MoreIcon, ItalicIcon, SearchIcon } from '@fluentui/react-icons-northstar';

const ToolbarExamplePopupInMenu = () => {
  const [menu1Open, setMenu1Open] = React.useState(false);
  const [menu2Open, setMenu2Open] = React.useState(false);

  return (
    <Toolbar
      aria-label="Popup in menu"
      items={[
        {
          icon: <MoreIcon />,
          key: 'menu1',
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
          icon: <ItalicIcon {...{ outline: true }} />,
          key: 'italic',
          kind: 'toggle',
          title: 'Italic',
        },
        {
          icon: <MoreIcon />,
          key: 'menu2',
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
