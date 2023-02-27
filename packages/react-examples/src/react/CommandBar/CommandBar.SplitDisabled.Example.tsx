import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

export const CommandBarSplitDisabledExample: React.FunctionComponent = () => {
  return (
    <div>
      <CommandBar items={_items} overflowButtonProps={overflowButtonProps} />
    </div>
  );
};

const _items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    split: true,
    ariaLabel: 'New',
    splitButtonAriaLabel: 'More New options',
    subMenuProps: {
      items: [
        { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
      ],
    },
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: { iconName: 'Upload' },
    split: true,
    ariaLabel: 'Upload',
    splitButtonAriaLabel: 'More Upload options',
    disabled: true,
    href: 'https://developer.microsoft.com/en-us/fluentui',
    subMenuProps: {
      items: [
        { key: 'item1', text: 'Item One' },
        { key: 'item2', text: 'Item Two' },
      ],
    },
  },
  {
    key: 'share',
    text: 'Share',
    iconProps: { iconName: 'Share' },
    disabled: true,
  },
  {
    key: 'download',
    text: 'Download',
    ariaLabel: 'Download',
    iconProps: { iconName: 'Download' },
    iconOnly: true,
    disabled: true,
  },
];
