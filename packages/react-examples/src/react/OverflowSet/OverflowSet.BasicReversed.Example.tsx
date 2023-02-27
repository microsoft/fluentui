import * as React from 'react';
import { IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Link } from '@fluentui/react/lib/Link';
import { IOverflowSetItemProps, OverflowSet } from '@fluentui/react/lib/OverflowSet';

const noOp = () => undefined;

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
  return (
    <Link styles={{ root: { marginRight: 10 } }} onClick={item.onClick}>
      {item.name}
    </Link>
  );
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
    <IconButton
      title="More options"
      styles={buttonStyles}
      menuIconProps={{ iconName: 'More' }}
      menuProps={{ items: overflowItems! }}
    />
  );
};

export const OverflowSetBasicReversedExample: React.FunctionComponent = () => (
  <OverflowSet
    aria-label="Basic Menu Example"
    items={[
      {
        key: 'item3',
        name: 'Link 3',
        onClick: noOp,
      },
      {
        key: 'item2',
        name: 'Link 2',
        onClick: noOp,
      },
      {
        key: 'item1',
        name: 'Link 1',
        onClick: noOp,
      },
    ]}
    overflowItems={[
      {
        key: 'item4',
        name: 'Overflow Link 1',
        onClick: noOp,
      },
      {
        key: 'item5',
        name: 'Overflow Link 2',
        onClick: noOp,
      },
    ]}
    onRenderOverflowButton={onRenderOverflowButton}
    onRenderItem={onRenderItem}
    overflowSide={'start'}
  />
);
