import * as React from 'react';
import { DefaultButton } from '@fluentui/react-next/lib/compat/Button';
import { IContextualMenuProps, IContextualMenuItem } from '@fluentui/react-next/lib/ContextualMenu';
import { TextField, ITextFieldStyles } from '@fluentui/react-next/lib/TextField';

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
    ariaLabel: 'New. Press enter or right arrow keys to open submenu.',
  },
  {
    key: 'share',
    subMenuProps: {
      items: [
        { key: 'shareToTwitter', text: 'Share to Twitter' },
        { key: 'shareToFacebook', text: 'Share to Facebook' },
        {
          key: 'shareToEmail',
          text: 'Share to Email',
          subMenuProps: {
            items: [
              { key: 'shareToOutlook_1', text: 'Share to Outlook', title: 'Share to Outlook' },
              { key: 'shareToGmail_1', text: 'Share to Gmail', title: 'Share to Gmail' },
            ],
          },
        },
      ],
    },
    text: 'Share',
    ariaLabel: 'Share. Press enter, space or right arrow keys to open submenu.',
  },
  {
    key: 'shareSplit',
    split: true,
    'aria-roledescription': 'split button',
    subMenuProps: {
      items: [
        { key: 'shareToTwitterSplit', text: 'Share to Twitter' },
        { key: 'shareToFacebookSplit', text: 'Share to Facebook' },
        {
          key: 'shareToEmailSplit',
          text: 'Share to Email',
          subMenuProps: {
            items: [
              { key: 'shareToOutlookSplit_1', text: 'Share to Outlook', title: 'Share to Outlook' },
              { key: 'shareToGmailSplit_1', text: 'Share to Gmail', title: 'Share to Gmail' },
            ],
          },
        },
      ],
    },
    text: 'Share w/ Split',
    ariaLabel: 'Share w/ Split. Press enter or space keys to trigger action. Press right arrow key to open submenu.',
  },
];
