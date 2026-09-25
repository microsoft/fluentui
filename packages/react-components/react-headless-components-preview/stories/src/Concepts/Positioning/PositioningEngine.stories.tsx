import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningEngineProvider } from '@fluentui/react-headless-components-preview/positioning';
// eslint-disable-next-line @fluentui/no-restricted-imports
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

import descriptionMd from './PositioningEngineDescription.md';
import styles from './positioning.module.css';

export const Engine = (): React.ReactNode => (
  <div className={styles.pageRoomy}>
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Per surface: the engine replaces CSS anchor positioning</h3>
      <p className={styles.sectionNote}>
        Identical <code>positioning</code> props. The left surface is laid out by the browser with{' '}
        <code>position-area</code>; the right one passes <code>engine: floatingUIPositioningEngine</code>, so Floating
        UI computes <code>left</code>/<code>top</code> instead and no anchor CSS is written.
      </p>
      <div className={styles.row}>
        <Popover positioning={{ position: 'below', align: 'start', offset: 8 }}>
          <PopoverTrigger>
            <button className={styles.trigger}>CSS anchor positioning (default)</button>
          </PopoverTrigger>
          <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
            <span className={styles.badge}>position-area</span> Positioned by the browser.
          </PopoverSurface>
        </Popover>

        <Popover positioning={{ position: 'below', align: 'start', offset: 8, engine: floatingUIPositioningEngine }}>
          <PopoverTrigger>
            <button className={styles.trigger}>floatingUIPositioningEngine</button>
          </PopoverTrigger>
          <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
            <span className={styles.badge}>engine</span> Positioned by Floating UI.
          </PopoverSurface>
        </Popover>
      </div>
    </section>

    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>App-wide: PositioningEngineProvider</h3>
      <p className={styles.sectionNote}>
        The provider makes the engine the default for every headless surface beneath it; none of the surfaces below sets{' '}
        <code>engine</code>. A component-level <code>engine</code> still wins over the provider. The engine also
        receives the <code>withArrow</code> element and writes its <code>left</code>/<code>top</code> along the anchored
        edge; CSS only paints it.
      </p>
      <PositioningEngineProvider value={floatingUIPositioningEngine}>
        <div className={styles.row}>
          <Popover withArrow positioning={{ position: 'below', align: 'start', offset: 10 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>below-start with arrow</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.surfaceEngineArrow} ${styles.flipReadout}`}>
              Engine from context.
            </PopoverSurface>
          </Popover>

          <Popover withArrow positioning={{ position: 'after', align: 'center', offset: 10 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>after with arrow</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.surfaceEngineArrow} ${styles.flipReadout}`}>
              Flips to <code>before</code> near the right edge.
            </PopoverSurface>
          </Popover>
        </div>
      </PositioningEngineProvider>
    </section>
  </div>
);

Engine.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
