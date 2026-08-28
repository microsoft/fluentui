import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Skeleton, SkeletonItem } from '@fluentui/react-windmod-preview/skeleton';
import {
  FluentProvider as GriffelFluentProvider,
  Skeleton as GriffelSkeleton,
  SkeletonItem as GriffelSkeletonItem,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type GroupProps = {
  animation?: 'wave' | 'pulse';
  appearance?: 'opaque' | 'translucent';
  size?: 16 | 24 | 32 | 48;
  shape?: 'circle' | 'rectangle' | 'square';
};

type ItemProps = GroupProps;

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; group: GroupProps; items: ItemProps[] }> = [
    { label: 'default', group: {}, items: [{}, {}] },
    { label: 'pulse', group: { animation: 'pulse' }, items: [{}, {}] },
    { label: 'translucent', group: { appearance: 'translucent' }, items: [{}, {}] },
    {
      label: 'pulse translucent',
      group: { animation: 'pulse', appearance: 'translucent' },
      items: [{}, {}],
    },
    { label: 'square group', group: { shape: 'square', size: 32 }, items: [{}, {}] },
    { label: 'circle group', group: { shape: 'circle', size: 48 }, items: [{}, {}] },
    { label: 'sizes', group: {}, items: [{ size: 16 }, { size: 24 }, { size: 48 }] },
    {
      label: 'item overrides group',
      group: { animation: 'pulse', shape: 'circle', size: 32 },
      items: [{}, { shape: 'rectangle' }, { animation: 'wave', size: 16 }],
    },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, group, items }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <Skeleton {...group}>
                <div className={styles.row}>
                  {items.map((item, index) => (
                    <SkeletonItem key={index} {...item} />
                  ))}
                </div>
              </Skeleton>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSkeleton {...group}>
                <div className={styles.row}>
                  {items.map((item, index) => (
                    <GriffelSkeletonItem key={index} {...item} />
                  ))}
                </div>
              </GriffelSkeleton>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
