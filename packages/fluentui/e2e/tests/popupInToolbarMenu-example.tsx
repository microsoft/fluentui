import * as React from 'react';
import { Toolbar, Input, toolbarMenuClassName, ToolbarProps } from '@fluentui/react-northstar';
import { ItalicIcon } from '@fluentui/react-icons-northstar';

export const selectors = {
  toolbarMenu: toolbarMenuClassName,
  menuButtonId: 'menuButton',
  popupTriggerId: 'popupTrigger',
  popupElementId: 'popupElement',
  dummyButtonId: 'dummyButton',
};

const ToolbarExamplePopupInMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const items: ToolbarProps['items'] = [
    {
      id: selectors.menuButtonId,
      key: 'menu',
      icon: 'more',
      active: menuOpen,
      menu: {
        items: [
          {
            id: selectors.popupTriggerId,
            key: 'popup',
            content: 'Open Popup',
            popup: {
              content: <Input id={selectors.popupElementId} icon="search" placeholder="Search..." />,
            },
          },
        ],
      },
      menuOpen,
      onMenuOpenChange: (e, { menuOpen }) => {
        setMenuOpen(menuOpen);
      },
    },
    {
      id: selectors.dummyButtonId,
      key: 'italic',
      kind: 'toggle',
      icon: <ItalicIcon outline />,
    },
  ];

  return <Toolbar items={items} />;
};

export default ToolbarExamplePopupInMenu;
