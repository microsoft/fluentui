import { Toolbar } from '@fluentui/react-northstar';
import * as React from 'react';
import { MoreIcon, UnderlineIcon, FontColorIcon } from '@fluentui/react-icons-northstar';

const ToolbarExampleMenuRadioGroup = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <Toolbar
      aria-label="Toolbar can contain a radio group in a menu"
      items={[
        {
          key: 'underline',
          content: 'underline',
          icon: <UnderlineIcon />,
          title: 'Underline',
        },
        {
          key: 'font color',
          content: 'font color',
          icon: <FontColorIcon />,
          title: 'Font color',
        },
        {
          icon: <MoreIcon />,
          key: 'more',
          active: menuOpen,
          title: 'More',
          menu: [
            {
              key: 'group',
              activeIndex,
              kind: 'group',
              items: [
                { key: 'left', content: 'Left' },
                { key: 'center', content: 'Center' },
                { key: 'right', content: 'Right' },
                { key: 'justify', content: 'Justify' },
              ],
              onItemClick: (e, data) => setActiveIndex(data.index),
            },
            { key: 'divider', kind: 'divider' },
            'About...',
          ],
          menuOpen,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenuOpen(menuOpen);
          },
        },
      ]}
    />
  );
};

export default ToolbarExampleMenuRadioGroup;
