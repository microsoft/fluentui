import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';

const overflowProps: IButtonProps = { ariaLabel: 'More commands' };

export const CommandBarMiddleItemsExample: React.FunctionComponent = () => {
  return (
    <div>
      <CommandBar
        items={_items}
        middleItems={_middleItems}
        overflowItems={_overflowItems}
        overflowButtonProps={overflowProps}
        farItems={_farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

const _items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    text: 'New',
    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Email message',
          iconProps: { iconName: 'Mail' },
          ['data-automation-id']: 'newEmailButton', // optional
        },
        {
          key: 'calendarEvent',
          text: 'Calendar event',
          iconProps: { iconName: 'Calendar' },
        },
      ],
    },
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: { iconName: 'Upload' },
    href: 'https://developer.microsoft.com/en-us/fluentui',
  },
  {
    key: 'share',
    text: 'Share',
    iconProps: { iconName: 'Share' },
    onClick: () => console.log('Share'),
  },
  {
    key: 'download',
    text: 'Download',
    iconProps: { iconName: 'Download' },
    onClick: () => console.log('Download'),
  },
];

const _middleItems: ICommandBarItemProps[] = [
  {
    key: 'file name',
    text: 'This is file name',
    onClick: () => console.log('file name'),
    iconProps: { iconName: 'PDF' },
  },
  {
    key: 'sub file name',
    text: 'Edit',
    onClick: () => console.log('middle info'),
    iconProps: { iconName: 'Edit' },
  },
];

const _overflowItems: ICommandBarItemProps[] = [
  { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
  { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
  { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: 'info',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    onClick: () => console.log('Info'),
  },
  {
    key: 'SeparatorLeft',
    iconOnly: true,
    iconProps: { iconName: 'Separator' },
  },
  {
    key: 'Previous',
    ariaLabel: 'Previous',
    iconOnly: true,
    iconProps: { iconName: 'Previous' },
    onClick: () => console.log('Previous'),
  },
  {
    key: 'Legend',
    text: '1 / 20',
  },
  {
    key: 'Next',
    ariaLabel: 'Next',
    iconOnly: true,
    iconProps: { iconName: 'Next' },
    onClick: () => console.log('Next'),
  },
  {
    key: 'SeparatorRight',
    iconOnly: true,
    iconProps: { iconName: 'Separator' },
  },
  {
    key: 'close',
    arialLabel: 'close',
    iconOnly: true,
    iconProps: { iconName: 'Cancel' },
    onClick: () => console.log('Tiles'),
  },
];
