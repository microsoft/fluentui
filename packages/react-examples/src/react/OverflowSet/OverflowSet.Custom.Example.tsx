import * as React from 'react';
import { IOverflowSetItemProps, OverflowSet, Checkbox } from '@fluentui/react';
import { CommandBarButton, IButtonStyles } from '@fluentui/react/lib/Button';

const noOp = () => undefined;

const checkboxStyles = {
  root: {
    marginRight: 5,
  },
};

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
  if (item.onRender) {
    return item.onRender(item);
  }
  return <CommandBarButton iconProps={{ iconName: item.icon }} menuProps={item.subMenuProps} text={item.name} />;
};

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      minWidth: 0,
      padding: '0 4px',
      alignSelf: 'stretch',
      height: 'auto',
    },
  };
  return (
    <CommandBarButton
      ariaLabel="More items"
      styles={buttonStyles}
      menuIconProps={{ iconName: 'More' }}
      menuProps={{ items: overflowItems! }}
    />
  );
};

export const OverflowSetCustomExample: React.FunctionComponent = () => (
  <OverflowSet
    aria-label="Custom Example"
    items={[
      {
        key: 'checkbox',
        onRender: () => {
          return <Checkbox label="A Checkbox" styles={checkboxStyles} />;
        },
      },
      {
        key: 'newItem',
        name: 'New',
        icon: 'Add',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: noOp,
        subMenuProps: {
          items: [
            {
              key: 'emailMessage',
              name: 'Email message',
              icon: 'Mail',
            },
            {
              key: 'calendarEvent',
              name: 'Calendar event',
              icon: 'Calendar',
            },
          ],
        },
      },
      {
        key: 'upload',
        name: 'Upload',
        icon: 'Upload',
        onClick: noOp,
      },
      {
        key: 'share',
        name: 'Share',
        icon: 'Share',
        onClick: noOp,
      },
    ]}
    overflowItems={[
      {
        key: 'move',
        name: 'Move to...',
        icon: 'MoveToFolder',
        onClick: noOp,
      },
      {
        key: 'copy',
        name: 'Copy to...',
        icon: 'Copy',
        onClick: noOp,
      },
      {
        key: 'rename',
        name: 'Rename...',
        icon: 'Edit',
        onClick: noOp,
      },
      {
        key: 'disabled',
        name: 'Disabled...',
        icon: 'Cancel',
        disabled: true,
        onClick: noOp,
      },
    ]}
    onRenderOverflowButton={onRenderOverflowButton}
    onRenderItem={onRenderItem}
  />
);
