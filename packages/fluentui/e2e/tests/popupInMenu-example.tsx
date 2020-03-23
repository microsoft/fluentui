import * as React from 'react';
import { Menu, Popup, Button } from '@fluentui/react-northstar';

export const selectors = {
  menuId: 'menu',
  menuItemId: index => `menu-item-${index}`,
  popupContentClass: Popup.slotClassNames.content,
  popupContentId: index => `popup-content-${index}`,
};

const items = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
  { key: 'focus-trap', content: 'Focus trap' },
];

const PopupInMenuExample = () => (
  <Menu
    id={selectors.menuId}
    defaultActiveIndex={0}
    items={items.map((item, index) => render => render(item, (MenuItem, props) => renderItem(MenuItem, props, index)))}
  />
);

const renderItem = (MenuItem, props, index) => {
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

export default PopupInMenuExample;
