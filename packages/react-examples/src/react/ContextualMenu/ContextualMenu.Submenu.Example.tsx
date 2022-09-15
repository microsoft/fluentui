import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { IContextualMenuProps, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';

const textFieldStyles: Partial<ITextFieldStyles> = {
  subComponentStyles: {
    label: { root: { display: 'inline-block', marginRight: '10px' } },
  },
  fieldGroup: { display: 'inline-flex', maxWidth: '100px' },
  wrapper: { display: 'block', marginBottom: '10px' },
};

export interface IContextualMenuSubmenuExampleState {
  hoverDelay: number;
}

export const ContextualMenuSubmenuExample: React.FunctionComponent = () => {
  const [hoverDelay, setHoverDelay] = React.useState(250);

  const onHoverDelayChanged = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
      setHoverDelay(Number(newValue) || 0);
    },
    [],
  );

  const menuProps: IContextualMenuProps = React.useMemo(
    () => ({
      shouldFocusOnMount: true,
      subMenuHoverDelay: hoverDelay,
      items: menuItems,
    }),
    [hoverDelay],
  );

  return (
    <div>
      <TextField
        value={String(hoverDelay)}
        label="Hover delay (ms)"
        type="number"
        onChange={onHoverDelayChanged}
        styles={textFieldStyles}
      />
      <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />
    </div>
  );
};

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    subMenuProps: {
      items: [
        { key: 'emailMessage', text: 'Email message', title: 'Create an email' },
        { key: 'calendarEvent', text: 'Calendar event', title: 'Create a calendar event' },
      ],
    },
    href: 'https://bing.com',
    text: 'New',
    target: '_blank',
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
  },
];
