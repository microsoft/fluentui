import * as React from 'react';
import { Menu, MenuProps } from '@fluentui/react-northstar';

const MenuExamplePositioningShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<'above' | 'before'>(undefined);

  const items: MenuProps['items'] = [
    {
      content: 'Editorials',
      key: 'editorials',
      menu: {
        items: [
          {
            active: true,
            content: 'item1',
            key: '1',
            menu: {
              items: [
                { key: '1', content: 'item2.1' },
                { key: '2', content: 'item2.2' },
              ],
              popper: position && {
                position,
              },
            },
            menuOpen,
          },
        ],
        popper: position && {
          position,
        },
      },
      menuOpen,
    },
  ];

  return (
    <div
      style={{
        border: '2px dotted orange',
        marginLeft: 150,
        marginRight: 150,
        marginTop: 150,
        padding: 30,
      }}
    >
      <Menu defaultActiveIndex={0} items={items} />

      <hr style={{ margin: 50 }} />

      <button id="set-open" onClick={() => setMenuOpen(true)}>
        Set open
      </button>
      <button id="above" onClick={() => setPosition('above')}>
        Set above
      </button>
      <button id="before" onClick={() => setPosition('before')}>
        Set before
      </button>
    </div>
  );
};

export default MenuExamplePositioningShorthand;
