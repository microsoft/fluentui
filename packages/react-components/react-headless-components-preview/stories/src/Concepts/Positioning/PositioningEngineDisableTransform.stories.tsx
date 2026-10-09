import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

import styles from './positioning.module.css';

export const EngineDisableTransform = (): React.ReactNode => (
  <PositioningProvider mode="floating-ui">
    <div className={styles.page}>
      <div className={styles.row}>
        <Popover>
          <PopoverTrigger>
            <button className={styles.trigger}>useTransform: true (default)</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceFallback}>
            Positioned with <code>transform: translate3d()</code>
          </PopoverSurface>
        </Popover>

        <Popover positioning={{ useTransform: false }}>
          <PopoverTrigger>
            <button className={styles.trigger}>useTransform: false</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceFallback}>
            Positioned with <code>left</code>/<code>top</code>
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  </PositioningProvider>
);

EngineDisableTransform.parameters = {
  docs: {
    description: {
      story: [
        'By default the engine positions the element with a [CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)',
        'for better performance. Set `useTransform: false` to receive plain `left`/`top` instead, e.g. when the surface',
        'has its own transform animation. Inspect the surfaces to compare their inline styles.',
      ].join('\n'),
    },
  },
};
