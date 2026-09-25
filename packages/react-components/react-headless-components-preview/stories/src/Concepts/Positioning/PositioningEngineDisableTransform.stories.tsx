import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
// Headless consumers import the engine from `@fluentui/react-positioning` directly; pulling the whole
// `@fluentui/react-components` barrel for one export would defeat the purpose of the headless package.
// eslint-disable-next-line @fluentui/no-restricted-imports
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

import styles from './positioning.module.css';

export const EngineDisableTransform = (): React.ReactNode => (
  <div className={styles.page}>
    <div className={styles.row}>
      <Popover positioning={{ engine: floatingUIPositioningEngine }}>
        <PopoverTrigger>
          <button className={styles.trigger}>useTransform: true (default)</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceFallback}>
          Positioned with <code>transform: translate3d()</code>
        </PopoverSurface>
      </Popover>

      <Popover positioning={{ useTransform: false, engine: floatingUIPositioningEngine }}>
        <PopoverTrigger>
          <button className={styles.trigger}>useTransform: false</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceFallback}>
          Positioned with <code>left</code>/<code>top</code>
        </PopoverSurface>
      </Popover>
    </div>
  </div>
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
