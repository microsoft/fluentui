import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';
import type { AvatarGroupProps } from '@fluentui/react-components';

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

export const Tooltip = (props: Partial<AvatarGroupProps>) => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });

  return (
    <AvatarGroup {...props}>
      {inlineItems.map(name => (
        <AvatarGroupItem name={name} key={name} />
      ))}
      {overflowItems && (
        <AvatarGroupPopover tooltip={{ content: 'My custom tooltip', relationship: 'label' }}>
          {overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};

Tooltip.parameters = {
  docs: {
    description: {
      story: 'You can customize the tooltip of the AvatarGroupPopover, for example for translations.',
    },
  },
};
