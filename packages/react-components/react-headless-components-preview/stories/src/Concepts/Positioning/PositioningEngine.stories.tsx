import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

import descriptionMd from './PositioningEngineDescription.md';
import styles from './positioning.module.css';

export const Engine = (): React.ReactNode => (
  <div className={styles.pageRoomy}>
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>mode=&quot;fallback&quot;: CSS where it is enough, Floating UI where not</h3>
      <p className={styles.sectionNote}>
        The recommended app-wide setup. The left surface keeps native CSS anchor positioning; the right one sets{' '}
        <code>autoSize</code>, which CSS cannot express, and hands over to Floating UI. In a browser without{' '}
        <code>position-area</code> both use Floating UI.
      </p>
      <PositioningProvider mode="fallback">
        <div className={styles.row}>
          <Popover positioning={{ position: 'below', align: 'start', offset: 8 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>No engine-only options</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              <span className={styles.badge}>position-area</span> Positioned by the browser.
            </PopoverSurface>
          </Popover>

          <Popover positioning={{ position: 'below', align: 'start', offset: 8, autoSize: true }}>
            <PopoverTrigger>
              <button className={styles.trigger}>autoSize</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              <span className={styles.badge}>floating-ui</span> Positioned by Floating UI.
            </PopoverSurface>
          </Popover>
        </div>
      </PositioningProvider>
    </section>

    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>mode=&quot;floating-ui&quot;: Floating UI for every surface</h3>
      <p className={styles.sectionNote}>
        Identical <code>positioning</code> props. The left surface is laid out by the browser with{' '}
        <code>position-area</code>; the right one is wrapped in{' '}
        <code>PositioningProvider mode=&quot;floating-ui&quot;</code>, so Floating UI computes <code>left</code>/
        <code>top</code> instead and no anchor CSS is written. The nearest provider wins, so wrapping a single surface
        overrides the mode for it alone.
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

        <PositioningProvider mode="floating-ui">
          <Popover positioning={{ position: 'below', align: 'start', offset: 8 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>mode=&quot;floating-ui&quot;</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              <span className={styles.badge}>floating-ui</span> Positioned by Floating UI.
            </PopoverSurface>
          </Popover>
        </PositioningProvider>
      </div>
    </section>

    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Arrows</h3>
      <p className={styles.sectionNote}>
        Floating UI also receives the <code>withArrow</code> element and writes its <code>left</code>/<code>top</code>{' '}
        along the anchored edge; CSS only paints it.
      </p>
      <PositioningProvider mode="floating-ui">
        <div className={styles.row}>
          <Popover withArrow positioning={{ position: 'below', align: 'start', offset: 10 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>below-start with arrow</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.surfaceEngineArrow} ${styles.flipReadout}`}>
              Positioned by Floating UI.
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
      </PositioningProvider>
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
