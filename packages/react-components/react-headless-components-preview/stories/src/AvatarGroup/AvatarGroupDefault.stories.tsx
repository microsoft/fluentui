import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  partitionAvatarGroupItems,
} from '@fluentui/react-headless-components-preview/avatar-group';

import styles from './avatar-group.module.css';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
];

const tones = [styles.tone1, styles.tone2, styles.tone3, styles.tone4];

export const Default = (): React.ReactNode => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names, maxInlineItems: 5 });

  return (
    <div className={styles.demo}>
      <AvatarGroup className={styles.group}>
        {inlineItems.map((name, i) => (
          <AvatarGroupItem
            key={name}
            name={name}
            avatar={{ className: `${styles.avatar} ${tones[i % tones.length]}` }}
          />
        ))}

        {overflowItems && (
          <AvatarGroupPopover
            triggerButton={{ className: styles.overflowTrigger }}
            content={{ className: styles.overflowList }}
            popoverSurface={{ className: styles.surface }}
          >
            {overflowItems.map((name, i) => (
              <AvatarGroupItem
                key={name}
                name={name}
                root={{ className: styles.overflowItem }}
                avatar={{ className: `${styles.avatar} ${tones[i % tones.length]}` }}
                overflowLabel={{ className: styles.overflowLabel }}
              />
            ))}
          </AvatarGroupPopover>
        )}
      </AvatarGroup>

      <span className={styles.caption}>Click the “+{(overflowItems ?? []).length}” avatar to reveal the rest.</span>
    </div>
  );
};
