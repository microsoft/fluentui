import * as React from 'react';
import { Menu } from '@fluentui/react-northstar';
import { BookmarkIcon, WordIcon, CalendarIcon } from '@fluentui/react-icons-northstar';

const MenuExampleVertical = () => (
  <Menu primary defaultActiveIndex={0} vertical>
    <Menu.Item
      index={0}
      icon={
        <BookmarkIcon outline />
      }
      content="Editorials"
    />
    <Menu.Item index={1} content="Reviews" icon={<WordIcon />} />
    <Menu.Item index={2} content="Upcoming Events" />
    <Menu.Item
      index={3}
      icon={<CalendarIcon />}
      content="View full calendar with content so long that it wraps"
      menu={
        <>
          <Menu.Item>
            <Menu.ItemContent key="item1">item1</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item>
            <Menu.ItemContent key="item2">item2</Menu.ItemContent>
          </Menu.Item>
          <Menu.Item
            content="item3"
            index={4}
            menu={
              <>
                <Menu.Item
                  content="item3"
                  key="item3"
                  menu={{
                    items: [<Menu.Item content="3.1" key="3.1" />],
                  }}
                />
              </>
            }
          />
        </>
      }
    />
  </Menu>
);

export default MenuExampleVertical;
