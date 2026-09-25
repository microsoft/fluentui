import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningEngineProvider } from '@fluentui/react-headless-components-preview/positioning';
// Headless consumers import the engine from `@fluentui/react-positioning` directly; pulling the whole
// `@fluentui/react-components` barrel for one export would defeat the purpose of the headless package.
// eslint-disable-next-line @fluentui/no-restricted-imports, import/no-extraneous-dependencies
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
import { InlineAnchored } from './InlineAnchored';

import descriptionMd from './PositioningEngineDescription.md';
import styles from './positioning.module.css';

const items = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`);

export const Engine = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLElement | null>(null);

  return (
    <div className={styles.pageRoomy}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Per-instance engine: autoSize</h3>
        <p className={styles.sectionNote}>
          <code>autoSize</code> constrains the surface to the available viewport space and makes it scroll. CSS anchor
          positioning cannot express this, so the popover delegates to <code>floatingUIPositioningEngine</code>.
        </p>
        <Popover
          positioning={{ position: 'below', align: 'start', autoSize: true, engine: floatingUIPositioningEngine }}
        >
          <PopoverTrigger>
            <button className={styles.trigger}>Open a long list</button>
          </PopoverTrigger>
          <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
            <ul>
              {items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PopoverSurface>
        </Popover>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Per-instance engine: overflowBoundary</h3>
        <p className={styles.sectionNote}>
          The surface flips and shifts against the dashed box instead of the viewport. Scroll the box to see the surface
          follow the trigger and stay inside the boundary.
        </p>
        <div ref={setBoundary} className={styles.demoBox} style={{ overflow: 'auto' }}>
          <div style={{ height: '520px', paddingTop: '160px' }}>
            <InlineAnchored
              positioning={{
                position: 'above',
                align: 'start',
                flipBoundary: boundary,
                overflowBoundary: boundary,
                engine: floatingUIPositioningEngine,
              }}
              surfaceClassName={`${styles.surfaceFallback} ${styles.flipReadout}`}
              trigger={<button className={`${styles.trigger} ${styles.triggerSm}`}>trigger inside a scroll box</button>}
            >
              <strong>Requested:</strong> above-start · boundaries: the dashed box
            </InlineAnchored>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>App-wide engine with an arrow</h3>
        <p className={styles.sectionNote}>
          <code>PositioningEngineProvider</code> makes the engine the default for every headless surface below it. The
          engine also positions the <code>withArrow</code> element.
        </p>
        <PositioningEngineProvider value={floatingUIPositioningEngine}>
          <Popover withArrow positioning={{ position: 'after', align: 'top', arrowPadding: 8 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>Provider-driven</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceCallout} ${styles.flipReadout}`}>
              Positioned by the engine from context
            </PopoverSurface>
          </Popover>
        </PositioningEngineProvider>
      </section>
    </div>
  );
};

Engine.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
