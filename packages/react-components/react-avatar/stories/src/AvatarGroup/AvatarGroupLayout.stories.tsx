import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-components';

import styles from './AvatarGroupLayout.module.css';

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

export const Layout = (): JSXElement => {
  const partitionedItems = partitionAvatarGroupItems({ items: names });
  const piePartitionedItems = partitionAvatarGroupItems({ items: names, layout: 'pie' });

  return (
    <div className={styles.root}>
      <AvatarGroup layout="spread">
        {partitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {partitionedItems.overflowItems && (
          <AvatarGroupPopover>
            {partitionedItems.overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
      <AvatarGroup layout="stack">
        {partitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {partitionedItems.overflowItems && (
          <AvatarGroupPopover>
            {partitionedItems.overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
      <AvatarGroup layout="pie">
        {piePartitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        {piePartitionedItems.overflowItems && (
          <AvatarGroupPopover>
            {piePartitionedItems.overflowItems.map(name => (
              <AvatarGroupItem name={name} key={name} />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>
    </div>
  );
};

Layout.parameters = {
  docs: {
    description: {
      story: `An AvatarGroup supports three layouts: spread, stack, and pie. The default is spread.`,
    },
  },
};
