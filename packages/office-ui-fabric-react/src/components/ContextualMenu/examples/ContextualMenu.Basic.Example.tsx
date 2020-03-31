import * as React from 'react';
import { ContextualMenu, ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useConstCallback } from '@uifabric/react-hooks';

export const ContextualMenuBasicExample: React.FunctionComponent = () => {
  const linkRef = React.useRef(null);
  const [showContextualMenu, setShowContextualMenu] = React.useState(false);
  const onShowContextualMenu = useConstCallback(() => setShowContextualMenu(true));
  const onHideContextualMenu = useConstCallback(() => setShowContextualMenu(false));

  return (
    <div>
      This example directly uses ContextualMenu to show how it can be attached to arbitrary elements. The remaining
      examples use ContextualMenu through Fluent UI Button components.
      <p>
        <b>
          <a ref={linkRef} onClick={onShowContextualMenu}>
            Click for ContextualMenu
          </a>
        </b>
      </p>
      <ContextualMenu
        items={menuItems}
        hidden={!showContextualMenu}
        target={linkRef}
        onItemClick={onHideContextualMenu}
        onDismiss={onHideContextualMenu}
      />
    </div>
  );
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
    onClick: () => console.log('New clicked'),
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'rename',
    text: 'Rename',
    onClick: () => console.log('Rename clicked'),
  },
  {
    key: 'edit',
    text: 'Edit',
    onClick: () => console.log('Edit clicked'),
  },
  {
    key: 'properties',
    text: 'Properties',
    onClick: () => console.log('Properties clicked'),
  },
  {
    key: 'linkNoTarget',
    text: 'Link same window',
    href: 'http://bing.com',
  },
  {
    key: 'linkWithTarget',
    text: 'Link new window',
    href: 'http://bing.com',
    target: '_blank',
  },
  {
    key: 'linkWithOnClick',
    name: 'Link click',
    href: 'http://bing.com',
    onClick: (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      alert('Link clicked');
      ev.preventDefault();
    },
    target: '_blank',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
    onClick: () => console.error('Disabled item should not be clickable.'),
  },
];
