import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type {
  PositioningImperativeRef,
  PositioningProps,
} from '@fluentui/react-headless-components-preview/positioning';
// eslint-disable-next-line @fluentui/no-restricted-imports
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

import styles from './positioning.module.css';

type OnPositioningEndEvent = Parameters<NonNullable<PositioningProps['onPositioningEnd']>>[0];

export const EngineListenToUpdates = (): React.ReactNode => {
  const [statusLog, setStatusLog] = React.useState<string[]>([]);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);

  const onPositioningEnd = React.useCallback((event: OnPositioningEndEvent) => {
    const { placement, escaped, referenceHidden } = event.detail;
    const logical = (event.currentTarget as HTMLElement | null)?.getAttribute('data-placement');
    setStatusLog(log =>
      [
        `${new Date().toLocaleTimeString()}  placement=${placement} (${logical})  escaped=${escaped}  referenceHidden=${referenceHidden}`,
        ...log,
      ].slice(0, 8),
    );
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.row}>
        <Popover
          onOpenChange={(_, data) => !data.open && setStatusLog([])}
          positioning={{ positioningRef, onPositioningEnd, position: 'below', engine: floatingUIPositioningEngine }}
        >
          <PopoverTrigger>
            <button className={styles.trigger}>Open popover</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceFallback}>
            <button
              className={`${styles.trigger} ${styles.triggerSm}`}
              onClick={() => positioningRef.current?.updatePosition()}
            >
              Update position
            </button>
          </PopoverSurface>
        </Popover>
        <ol className={styles.log} role="log">
          {statusLog.length === 0 ? (
            <li className={styles.logEmpty}>Open the popover to see position updates.</li>
          ) : (
            statusLog.map((entry, i) => <li key={i}>{entry}</li>)
          )}
        </ol>
      </div>
    </div>
  );
};

EngineListenToUpdates.parameters = {
  docs: {
    description: {
      story: [
        'Positioning happens outside of the React render lifecycle for performance purposes, so a position update',
        'does not need to be triggered by, or depend on, a re-render. To know when an element has been positioned,',
        'use the `onPositioningEnd` callback. `event.detail` carries the Floating UI `placement`, `escaped` and',
        '`referenceHidden`; the engine has already mirrored the logical placement into `data-placement` on the surface',
        'by the time the callback runs.',
        '',
        'CSS anchor positioning has no positioning lifecycle, so this callback requires a positioning engine.',
        '',
        '> ⚠️ _Very few use cases actually require listening to position updates. This is different from the_',
        '_**open/close state**, which is handled in React._',
      ].join('\n'),
    },
  },
};
