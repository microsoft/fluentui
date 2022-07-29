import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupOverflow,
  getPartitionedAvatarGroupItems,
} from '@fluentui/react-avatar';
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
  const avatarGroupItems = names.map(name => <AvatarGroupItem name={name} key={name} />);
  const { inlineItems, overflowItems } = getPartitionedAvatarGroupItems(avatarGroupItems);

  return (
    <AvatarGroup {...props}>
      {inlineItems}
      <AvatarGroupOverflow>{overflowItems}</AvatarGroupOverflow>
    </AvatarGroup>
  );
};
