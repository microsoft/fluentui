import * as React from 'react';
import {
  Menu,
  MenuItem,
  Popup,
  Button,
  ShorthandRenderFunction,
  MenuItemProps,
  popupContentClassName,
} from '@fluentui/react-northstar';

export const selectors = {
  menuId: 'menu',
  menuItemId: index => `menu-item-${index}`,
  popupContentClass: popupContentClassName,
  popupContentId: index => `popup-content-${index}`,
};

const renderItem =
  (index: number): ShorthandRenderFunction<MenuItemProps & { key: string }> =>
  (Component, props) => {
    if (props.key === 'focus-trap') {
      return (
        <Popup
          key={index}
          trigger={<MenuItem id={selectors.menuItemId(index)} {...props} />}
          trapFocus
          content={<Button content="Test Content" id={selectors.popupContentId(index)} />}
        />
      );
    }
    return (
      <Popup
        key={index}
        trigger={<MenuItem id={selectors.menuItemId(index)} {...props} />}
        content={{ content: 'Test Content', id: selectors.popupContentId(index) }}
      />
    );
  };

const items = [
  { key: 'editorials', content: 'Editorials', children: renderItem(0) },
  { key: 'review', content: 'Reviews', children: renderItem(1) },
  { key: 'events', content: 'Upcoming Events', children: renderItem(2) },
  { key: 'focus-trap', content: 'Focus trap', children: renderItem(3) },
];

const PopupInMenuExample = () => <Menu id={selectors.menuId} defaultActiveIndex={0} items={items} />;

export default PopupInMenuExample;
