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
      menu={[
        <Menu.ItemContent key="item1">item1</Menu.ItemContent>,
        <Menu.ItemContent key="item2">item2</Menu.ItemContent>,
        <Menu.ItemContent key="item3">item3</Menu.ItemContent>,
      ]}
    />
  </Menu>
);

export default MenuExampleVertical;
