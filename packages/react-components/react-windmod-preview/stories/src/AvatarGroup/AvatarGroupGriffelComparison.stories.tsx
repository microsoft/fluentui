import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, FluentProvider } from '@fluentui/react-windmod-preview';
import {
  AvatarGroup as GriffelAvatarGroup,
  AvatarGroupItem as GriffelAvatarGroupItem,
  AvatarGroupPopover as GriffelAvatarGroupPopover,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

const names = ['Katri Athokas', 'Elvia Atkins', 'Cameron Evans', 'Wanda Howard', 'Mona Kane', 'Allan Munger'];

type Layout = 'spread' | 'stack' | 'pie';

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; layout: Layout; size: number; inline: number; overflow: number }> = [
    { label: 'spread 16', layout: 'spread', size: 16, inline: 3, overflow: 3 },
    { label: 'spread 24', layout: 'spread', size: 24, inline: 3, overflow: 3 },
    { label: 'spread 32', layout: 'spread', size: 32, inline: 6, overflow: 0 },
    { label: 'stack 32', layout: 'stack', size: 32, inline: 6, overflow: 0 },
    { label: 'stack 56', layout: 'stack', size: 56, inline: 6, overflow: 0 },
    { label: 'stack 40 + overflow', layout: 'stack', size: 40, inline: 3, overflow: 3 },
    { label: 'pie 32 (2)', layout: 'pie', size: 32, inline: 2, overflow: 0 },
    { label: 'pie 32 (3)', layout: 'pie', size: 32, inline: 3, overflow: 0 },
    { label: 'pie 96 (3)', layout: 'pie', size: 96, inline: 3, overflow: 0 },
  ];

  return (
    <div className={styles.stack}>
      {variants.map(({ label, layout, size, inline, overflow }) => (
        <div className={styles.row} key={label} style={{ gap: 48 }}>
          <FluentProvider>
            <AvatarGroup layout={layout} size={size as never}>
              {names.slice(0, inline).map(name => (
                <AvatarGroupItem key={name} name={name} />
              ))}
              {overflow > 0 && (
                <AvatarGroupPopover>
                  {names.slice(inline, inline + overflow).map(name => (
                    <AvatarGroupItem key={name} name={name} />
                  ))}
                </AvatarGroupPopover>
              )}
            </AvatarGroup>
          </FluentProvider>
          <GriffelFluentProvider theme={webLightTheme}>
            <GriffelAvatarGroup layout={layout} size={size as never}>
              {names.slice(0, inline).map(name => (
                <GriffelAvatarGroupItem key={name} name={name} />
              ))}
              {overflow > 0 && (
                <GriffelAvatarGroupPopover>
                  {names.slice(inline, inline + overflow).map(name => (
                    <GriffelAvatarGroupItem key={name} name={name} />
                  ))}
                </GriffelAvatarGroupPopover>
              )}
            </GriffelAvatarGroup>
          </GriffelFluentProvider>
        </div>
      ))}
    </div>
  );
};
