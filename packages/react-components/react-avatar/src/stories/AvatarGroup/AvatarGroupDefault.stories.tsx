import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from '@fluentui/react-avatar';
import type { AvatarGroupProps } from '@fluentui/react-avatar';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const Default = (props: Partial<AvatarGroupProps>) => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

  return (
    <AvatarGroup {...props}>
      {inlineItems.map(name => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      <AvatarGroupPopover>
        {overflowItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
      </AvatarGroupPopover>
    </AvatarGroup>
  );
};
