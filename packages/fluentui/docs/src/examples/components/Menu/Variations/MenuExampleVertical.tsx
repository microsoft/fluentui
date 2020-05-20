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
        <>
          <Menu.Item>
            <Menu.ItemContent>item 1</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item>
            <Menu.ItemContent>item 2</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item>
            <Menu.ItemContent>item 3</Menu.ItemContent>
          </Menu.Item>
        </>
      }
    />
  </Menu>
);

export default MenuExampleVertical;
