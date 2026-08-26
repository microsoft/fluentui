import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  FluentProvider,
  partitionAvatarGroupItems,
} from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const names = [
  'Katri Athokas',
  'Elvia Atkins',
  'Cameron Evans',
  'Wanda Howard',
  'Mona Kane',
  'Allan Munger',
  'Daisy Phillips',
  'Robert Tolbert',
];

const layouts = ['spread', 'stack', 'pie'] as const;
const sizes = [16, 24, 32, 48, 96] as const;

const Overflowing = ({ layout, size }: { layout: (typeof layouts)[number]; size: number }) => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names, layout });

  return (
    <AvatarGroup layout={layout} size={size as never}>
      {inlineItems.map(name => (
        <AvatarGroupItem key={name} name={name} />
      ))}
      {overflowItems && (
        <AvatarGroupPopover>
          {overflowItems.map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
        </AvatarGroupPopover>
      )}
    </AvatarGroup>
  );
};

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {layouts.map(layout => (
        <div className={styles.row} key={layout} style={{ gap: 32 }}>
          {sizes.map(size => (
            <Overflowing key={size} layout={layout} size={size} />
          ))}
        </div>
      ))}
    </div>
  </FluentProvider>
);
