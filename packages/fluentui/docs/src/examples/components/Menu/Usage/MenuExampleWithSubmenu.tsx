import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { CircleIcon } from '@fluentui/react-icons-northstar';

const MenuExampleWithSubMenu = () => (
  <Menu defaultActiveIndex={0}>
    <Menu.Item
      index={0}
      menu={
        <>
          <Menu.Item>
            <Menu.ItemContent key="item1">item1</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item
            index={1}
            content="item 2"
            menu={
              <>
                <Menu.Item content="item 2.1" />
                <Menu.Item content="item 2.2" />
              </>
            }
          />
          <Menu.Item
            content="item 3"
            index={2}
            menu={
              <>
                <Menu.Item content="item 3.1" />
                <Menu.Item content="item 3.2" />
              </>
            }
          />
        </>
      }
      content="Editorials"
    />

    <Menu.Item
      index={1}
      menu={
        <>
          <Menu.Item>
            <Menu.ItemContent key="item1">item1</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item
            index={1}
            icon={<CircleIcon />}
            content="item2 non augue tortor mollis"
            menu={
              <>
                <Menu.Item icon={<CircleIcon />} content="item 2.1" />
                <Menu.Item content="item 2.2" />
              </>
            }
          />
          <Menu.Item
            content="item 3 elementum urna varius augue ultrices gravida malesuada fames"
            index={2}
            icon={<CircleIcon />}
            menu={
              <>
                <Menu.Item icon={<CircleIcon />} content="item 3.1" />
                <Menu.Item content="item 3.2" />
              </>
            }
          />
        </>
      }
      content="Reviews"
    />

    <Menu.Item index={2}>
      <Menu.ItemContent>Upcoming Events</Menu.ItemContent>
    </Menu.Item>
  </Menu>
);

export default MenuExampleWithSubMenu;
