import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

const options: Array<{
  label: string;
  position: NonNullable<PositioningProps['position']>;
  align: NonNullable<PositioningProps['align']>;
}> = [
  { label: 'above-start', position: 'above', align: 'start' },
  { label: 'above', position: 'above', align: 'center' },
  { label: 'above-end', position: 'above', align: 'end' },
  { label: 'before-top', position: 'before', align: 'start' },
  { label: 'before', position: 'before', align: 'center' },
  { label: 'before-bottom', position: 'before', align: 'end' },
  { label: 'after-top', position: 'after', align: 'start' },
  { label: 'after', position: 'after', align: 'center' },
  { label: 'after-bottom', position: 'after', align: 'end' },
  { label: 'below-start', position: 'below', align: 'start' },
  { label: 'below', position: 'below', align: 'center' },
  { label: 'below-end', position: 'below', align: 'end' },
];

export const ShorthandPositions = (): React.ReactNode => {
  const [selected, setSelected] = React.useState(options[1]);

  return (
    <div className={styles.outer}>
      <div className={styles.layout}>
        <label className={styles.controls}>
          Position
          <select
            className={styles.select}
            value={selected.label}
            onChange={e => {
              const next = options.find(o => o.label === e.target.value);
              if (next) {
                setSelected(next);
              }
            }}
          >
            {options.map(option => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.stage}>
          <Popover open positioning={{ position: selected.position, align: selected.align }}>
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerFixed}`}>{selected.label}</button>
            </PopoverTrigger>
            <PopoverSurface className={styles.surfaceShorthand}>Container</PopoverSurface>
          </Popover>
        </div>
      </div>
    </div>
  );
};
