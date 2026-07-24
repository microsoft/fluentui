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
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const tones = [styles.tone1, styles.tone2, styles.tone3, styles.tone4];
const pieTones = [styles.pieTone1, styles.pieTone2, styles.pieTone3];

export const Default = (): React.ReactNode => {
  const spreadPartitionedItems = partitionAvatarGroupItems({ items: names });
  const piePartitionedItems = partitionAvatarGroupItems({ items: names, layout: 'pie' });

  return (
    <div className={styles.demo}>
      <section className={styles.layout}>
        <div className={styles.layoutTitle}>Spread</div>
        <AvatarGroup className={[styles.group, styles.groupSpread].join(' ')}>
          {spreadPartitionedItems.inlineItems.map((name, i) => (
            <AvatarGroupItem
              key={name}
              name={name}
              root={{ className: [styles.item, styles.itemSpread].join(' ') }}
              avatar={{ className: `${styles.avatar} ${tones[i % tones.length]}` }}
            />
          ))}
          {spreadPartitionedItems.overflowItems && (
            <AvatarGroupPopover
              triggerButton={{ className: [styles.overflowTrigger, styles.overflowTriggerSpread].join(' ') }}
              content={{ className: styles.overflowList }}
              popoverSurface={{ className: styles.surface }}
            >
              {spreadPartitionedItems.overflowItems.map((name, i) => (
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
      </section>

      <section className={styles.layout}>
        <div className={styles.layoutTitle}>Stack</div>
        <AvatarGroup className={[styles.group, styles.groupStack].join(' ')} layout="stack">
          {spreadPartitionedItems.inlineItems.map((name, i) => (
            <AvatarGroupItem
              key={name}
              name={name}
              root={{ className: [styles.item, styles.itemStack].join(' ') }}
              avatar={{ className: `${styles.avatar} ${tones[i % tones.length]}` }}
            />
          ))}
          {spreadPartitionedItems.overflowItems && (
            <AvatarGroupPopover
              triggerButton={{ className: [styles.overflowTrigger, styles.overflowTriggerStack].join(' ') }}
              content={{ className: styles.overflowList }}
              popoverSurface={{ className: styles.surface }}
            >
              {spreadPartitionedItems.overflowItems.map((name, i) => (
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
      </section>

      <section className={styles.layout}>
        <div className={styles.layoutTitle}>Pie</div>
        <AvatarGroup className={styles.pieGroup} layout="pie">
          {piePartitionedItems.inlineItems.map((name, i) => {
            const pieAvatarClassName = [styles.pieAvatar, pieTones[i % pieTones.length]].join(' ');
            const pieItemClassName = [styles.pieItem, styles.pieItemBase].join(' ');

            return (
              <AvatarGroupItem
                key={name}
                name={name}
                root={{ className: pieItemClassName }}
                avatar={{ className: pieAvatarClassName }}
              />
            );
          })}
          {piePartitionedItems.overflowItems && (
            <AvatarGroupPopover
              triggerButton={{ className: [styles.overflowTrigger, styles.overflowTriggerPie].join(' ') }}
              content={{ className: styles.overflowList }}
              popoverSurface={{ className: styles.surface }}
            >
              {piePartitionedItems.overflowItems.map((name, i) => (
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
      </section>
    </div>
  );
};
