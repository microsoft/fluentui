import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { CircleIcon } from '@fluentui/react-icons-northstar';

const MenuExampleWithSubMenu = () => (
  <Menu defaultActiveIndex={0}>
    <Menu.Item
      index={1}
      menu={[
        { key: '1', content: 'item1' },
        {
          key: '2',
          content: 'item2',
          menu: [
            { key: '1', content: 'item2.1' },
            { key: '2', content: 'item2.2' },
          ],
        },
        {
          key: '3',
          content: 'item3',
          menu: [
            { key: '1', content: 'item3.1' },
            { key: '2', content: 'item3.2' },
          ],
        },
      ]}
      content="Editorials"
    />

    <Menu.Item
      index={2}
      menu={[
        { key: '1', content: 'item1' },
        {
          key: '2',
          icon: <CircleIcon />,
          content: 'item2 non augue tortor mollis',
          menu: [
            { key: '1', icon: <CircleIcon />, content: 'item2.1' },
            { key: '2', content: 'item2.2' },
          ],
        },
        {
          key: '3',
          icon: <CircleIcon />,
          content: 'item3 elementum urna varius augue ultrices gravida malesuada fames',
          menu: [
            { key: '1', icon: <CircleIcon />, content: 'item3.1' },
            { key: '2', content: 'item3.2' },
          ],
        },
      ]}
    >
      <Menu.ItemContent>Reviews</Menu.ItemContent>
    </Menu.Item>

    <Menu.Item index={3}>
      <Menu.ItemContent>Upcoming Events</Menu.ItemContent>
    </Menu.Item>
  </Menu>
);

export default MenuExampleWithSubMenu;
