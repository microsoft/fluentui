import * as React from 'react';
import {
  ContextualMenuItemType,
  IContextualMenuProps,
  IContextualMenuItem,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export const ContextualMenuPersistedExample: React.FunctionComponent = () => {
  return <DefaultButton text="Click for ContextualMenu" persistMenu={true} menuProps={menuProps} />;
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          title: 'Create an email',
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          title: 'Create a calendar event',
        },
      ],
    },
    href: 'https://bing.com',
    text: 'New',
    target: '_blank',
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

const menuProps: IContextualMenuProps = {
  shouldFocusOnMount: true,
  shouldFocusOnContainer: true,
  items: menuItems,
};
