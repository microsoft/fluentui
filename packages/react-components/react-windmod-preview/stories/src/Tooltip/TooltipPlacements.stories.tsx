import * as React from 'react';
import { Button, ThemeProvider, Tooltip } from '@fluentui/react-windmod-preview';
import type { TooltipProps } from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const placements = [
  'above-start',
  'above',
  'above-end',
  'before-top',
  'before',
  'before-bottom',
  'after-top',
  'after',
  'after-bottom',
  'below-start',
  'below',
  'below-end',
] as const;

/** All 12 placements pinned open — exercises data-placement re-keying + the pure-CSS arrow. */
export const Placements = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.placementsGrid}>
      {placements.map(positioning => (
        <Tooltip
          key={positioning}
          // popover='manual' ONLY because these are pinned open side by side: 'hint'
          // popovers are exclusive by spec, so twelve visible hints collapse to one.
          content={{ children: positioning, popover: 'manual' }}
          relationship="label"
          withArrow
          visible
          positioning={positioning as TooltipProps['positioning']}
        >
          <Button>{positioning}</Button>
        </Tooltip>
      ))}
    </div>
  </ThemeProvider>
);
