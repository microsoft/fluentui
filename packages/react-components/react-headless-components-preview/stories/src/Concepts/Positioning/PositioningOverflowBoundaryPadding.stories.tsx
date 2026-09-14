import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const OverflowBoundaryPadding = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const [padding, setPadding] = React.useState(8);

  return (
    <div className={styles.column}>
      <label className={styles.row}>
        Boundary padding
        <input
          className={styles.input}
          type="number"
          min={0}
          step={4}
          value={padding}
          onChange={event => setPadding(event.currentTarget.valueAsNumber || 0)}
        />
      </label>
      <div ref={setBoundary} className={styles.boundary}>
        <Popover
          defaultOpen
          positioning={{
            overflowBoundary: boundary,
            overflowBoundaryPadding: padding,
            position: 'below',
            align: 'start',
          }}
        >
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Shorthand padding</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceCallout}>{padding}px on every side</PopoverSurface>
        </Popover>
        <Popover
          defaultOpen
          positioning={{
            overflowBoundary: boundary,
            overflowBoundaryPadding: { end: padding, top: 0, start: 0, bottom: 0 },
            position: 'above',
            align: 'start',
          }}
        >
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Longhand padding</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceCallout}>{padding}px on the logical end</PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

OverflowBoundaryPadding.parameters = {
  docs: {
    description: {
      story: '`overflowBoundaryPadding` accepts one value for every side or logical per-side values.',
    },
  },
};
