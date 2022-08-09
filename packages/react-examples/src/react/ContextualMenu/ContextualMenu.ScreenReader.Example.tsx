import * as React from 'react';
import { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';

export const ContextualMenuScreenReaderExample: React.FunctionComponent = () => {
  const menuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      subMenuProps: {
        items: [
          { key: 'emailMessage', text: 'Email message', ariaDescription: 'Emails are fun' },
          {
            key: 'calendarEvent',
            text: 'Calendar event',
            ariaDescription: 'Calendar events are even more fun',
          },
        ],
      },
      href: 'https://bing.com',
      text: 'New',
      target: '_blank',
      ariaDescription: 'Additional information about new item',
    },
    {
      key: 'share',
      subMenuProps: {
        items: [
          { key: 'sharetotwitter', text: 'Share to Twitter' },
          { key: 'sharetofacebook', text: 'Share to Facebook' },
          {
            key: 'sharetoemail',
            text: 'Share to Email',
            subMenuProps: {
              items: [
                { key: 'sharetooutlook_1', text: 'Share to Outlook', title: 'Share to Outlook' },
                { key: 'sharetogmail_1', text: 'Share to Gmail', title: 'Share to Gmail' },
              ],
            },
          },
        ],
      },
      text: 'Share',
      ariaDescription: 'Additional information about share item',
    },
    {
      key: 'shareSplit',
      split: true,
      'aria-roledescription': 'split button',
      subMenuProps: {
        items: [
          { key: 'sharetotwittersplit', text: 'Share to Twitter' },
          { key: 'sharetofacebooksplit', text: 'Share to Facebook' },
          {
            key: 'sharetoemailsplit',
            text: 'Share to Email',
            subMenuProps: {
              items: [
                { key: 'sharetooutlooksplit_1', text: 'Share to Outlook', title: 'Share to Outlook' },
                { key: 'sharetogmailsplit_1', text: 'Share to Gmail', title: 'Share to Gmail' },
              ],
            },
          },
        ],
      },
      text: 'Share w/ Split',
      ariaDescription: 'Additional information about share split item',
    },
  ];
  const menuProps = useConst<IContextualMenuProps>(() => ({
    items: menuItems,
  }));

  return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};
