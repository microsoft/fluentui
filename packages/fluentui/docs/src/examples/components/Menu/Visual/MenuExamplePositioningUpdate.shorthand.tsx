import * as React from 'react';
import { Menu, MenuProps, PopperRefHandle } from '@fluentui/react-northstar';

const MenuExamplePositioningUpdateShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(50);
  const popperRef = React.useRef<PopperRefHandle>();

  const items: MenuProps['items'] = [
    {
      content: 'Editorials',
      key: 'editorials',
      menu: {
        items: [
          { active: true, content: 'item1', key: '1' },
          { content: 'item2', key: '2' },
          {
            content: (
              <div style={{ border: '1px solid green', height, padding: 5 }}>An item3 with some long content</div>
            ),
            key: '3',
          },
        ],
        popper: { position: 'above', popperRef },
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

      <hr style={{ margin: 100 }} />
      <div style={{ float: 'right' }}>
        <button id="set-open" onClick={() => setMenuOpen(true)}>
          Set open
        </button>
        <button id="set-height" onClick={() => setHeight(300)}>
          Set height
        </button>
        <button id="reposition" onClick={() => popperRef.current.updatePosition()}>
          Set position
        </button>
      </div>
    </div>
  );
};

export default MenuExamplePositioningUpdateShorthand;
