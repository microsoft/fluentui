import * as React from 'react';
import { Button, FluentProvider, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-windmod-preview';
import type { PopoverProps } from '@fluentui/react-windmod-preview';

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
  <FluentProvider>
    <div className={styles.placementsGrid}>
      {placements.map(positioning => (
        <Popover key={positioning} open withArrow positioning={positioning as PopoverProps['positioning']}>
          <PopoverTrigger>
            <Button>{positioning}</Button>
          </PopoverTrigger>
          {/* Twelve surfaces are pinned open at once — see PopoverGriffelComparison.stories.tsx. */}
          <PopoverSurface popover="manual">{positioning}</PopoverSurface>
        </Popover>
      ))}
    </div>
  </FluentProvider>
);
