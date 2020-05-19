import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { BookmarkIcon, WordIcon, CalendarIcon } from '@fluentui/react-icons-northstar';

const MenuExampleVertical = () => (
  <Menu defaultActiveIndex={0} vertical>
    <Menu.Item
      index={0}
      icon={
        <BookmarkIcon
          {...{
            outline: true,
          }}
        />
      }
      content="Editorials"
    />
    <Menu.Item index={1} icon={<WordIcon {...{}} />} content="Reviews" />
    <Menu.Item index={2} content="Upcoming Events" />
    <Menu.Item
      index={3}
      icon={<CalendarIcon {...{}} />}
      content="View full calendar with content so long that it wraps"
      menu={
        <Menu>
          <Menu.Item index={0}>
            <Menu.ItemContent>item1</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item index={1}>
            <Menu.ItemContent>item2</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item index={2}>
            <Menu.ItemContent>item3</Menu.ItemContent>
          </Menu.Item>
        </Menu>
      }
    />
  </Menu>
);

export default MenuExampleVertical;
