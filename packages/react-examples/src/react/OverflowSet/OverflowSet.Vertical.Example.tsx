import * as React from 'react';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import { IOverflowSetItemProps, OverflowSet } from '@fluentui/react/lib/OverflowSet';
import { DirectionalHint, TooltipHost } from '@fluentui/react';

const noOp = () => undefined;

const onRenderItemStyles = {
  root: { padding: '10px' },
};
const onRenderOverflowButtonStyles = {
  root: { padding: '10px' },
  menuIcon: { fontSize: '16px' },
};

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
  return (
    <TooltipHost content={item.title} directionalHint={DirectionalHint.rightCenter}>
      <CommandBarButton
        aria-label={item.name}
        styles={onRenderItemStyles}
        iconProps={{ iconName: item.icon }}
        onClick={item.onClick}
      />
    </TooltipHost>
  );
};

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
  return (
    <TooltipHost content="More items" directionalHint={DirectionalHint.rightCenter}>
      <CommandBarButton
        aria-label="More items"
        styles={onRenderOverflowButtonStyles}
        menuIconProps={{ iconName: 'More' }}
        menuProps={{ items: overflowItems! }}
      />
    </TooltipHost>
  );
};

export const OverflowSetVerticalExample: React.FunctionComponent = () => (
  <OverflowSet
    aria-label="Vertical Example"
    vertical
    items={[
      {
        key: 'item1',
        icon: 'Add',
        name: 'Add',
        title: 'Add',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: noOp,
      },
      {
        key: 'item2',
        icon: 'Upload',
        name: 'Upload',
        title: 'Upload',
        onClick: noOp,
      },
      {
        key: 'item3',
        icon: 'Share',
        name: 'Share',
        title: 'Share',
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
  />
);
