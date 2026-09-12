import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import type {
  PositioningImperativeRef,
  PositioningProps,
} from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

type PositioningEndEvent = Parameters<NonNullable<PositioningProps['onPositioningEnd']>>[0];

export const ListenToUpdates = (): React.ReactNode => {
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const [entries, setEntries] = React.useState<string[]>([]);

  const onPositioningEnd = React.useCallback((event: PositioningEndEvent) => {
    const { placement, escaped, referenceHidden } = event.detail;
    setEntries(current => [`${placement}; escaped=${escaped}; referenceHidden=${referenceHidden}`, ...current]);
  }, []);

  return (
    <div className={styles.logLayout}>
      <Popover defaultOpen positioning={{ position: 'below', positioningRef, onPositioningEnd }}>
        <PopoverTrigger>
          <button className={styles.trigger}>Toggle popover</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceCallout}>
          <button className={styles.triggerSm} onClick={() => positioningRef.current?.updatePosition()}>
            Update position
          </button>
        </PopoverSurface>
      </Popover>
      <div>
        <h3 className={styles.sectionTitle}>Positioning updates</h3>
        <div role="log" aria-label="Positioning updates" className={styles.log}>
          {entries.map((entry, index) => (
            <div key={`${entry}-${index}`}>{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

ListenToUpdates.parameters = {
  docs: {
    description: {
      story:
        '`onPositioningEnd` reports final placement, escape, and reference visibility data. Observing computed updates requires the lazy floating-ui implementation.',
    },
  },
};
