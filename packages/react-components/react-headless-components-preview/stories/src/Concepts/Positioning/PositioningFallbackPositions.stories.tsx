import * as React from 'react';
import { InlineAnchored } from './InlineAnchored';

import styles from './positioning.module.css';

export const FallbackPositions = (): React.ReactNode => (
  <div className={styles.pageRoomy}>
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Basic fallback</h3>
      <p className={styles.sectionNote}>
        Primary <code>above</code> overflows the box → first fallback <code>below-start</code> fits → surface renders
        there.
      </p>
      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{
            position: 'above',
            align: 'center',
            fallbackPositions: ['below-start', 'after'],
          }}
          surfaceClassName={`${styles.surfaceFallback} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopCenter}`}>trigger near top</button>
          }
        >
          <strong>Requested:</strong> above · fallbacks: <code>below-start</code>, <code>after</code>
        </InlineAnchored>
      </div>
    </section>

    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Chain walking</h3>
      <p className={styles.sectionNote}>
        Trigger pinned to top-left. Primary <code>above</code> overflows, first fallback <code>before</code> also
        overflows (no room to the left), so the browser falls through to <code>below</code>. The live{' '}
        <strong>Actual</strong> readout should read <code>below</code>.
      </p>
      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{
            position: 'above',
            align: 'center',
            fallbackPositions: ['before', 'below'],
          }}
          surfaceClassName={`${styles.surfaceFallback} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopLeft}`}>top-left trigger</button>
          }
        >
          <strong>Requested:</strong> above · fallbacks: <code>before</code>, <code>below</code>
        </InlineAnchored>
      </div>
    </section>

    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>Custom chain replaces default flip</h3>
      <p className={styles.sectionNote}>
        Same overflow condition, different chains. Left popover has no <code>fallbackPositions</code> → default{' '}
        <code>flip-block, flip-inline</code> fires → surface ends up below. Right popover passes <code>['after']</code>{' '}
        → custom chain replaces defaults → surface goes to the right instead of flipping.
      </p>
      <div className={styles.grid}>
        <div className={styles.demoBox}>
          <InlineAnchored
            positioning={{ position: 'above', align: 'center' }}
            surfaceClassName={`${styles.surfaceFallback} ${styles.flipReadout}`}
            trigger={
              <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopCenter}`}>default (flip)</button>
            }
          >
            <strong>Requested:</strong> above · no custom fallbacks
          </InlineAnchored>
        </div>
        <div className={styles.demoBox}>
          <InlineAnchored
            positioning={{
              position: 'above',
              align: 'center',
              fallbackPositions: ['after', 'below'],
            }}
            surfaceClassName={`${styles.surfaceFallback} ${styles.flipReadout}`}
            trigger={
              <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopCenter}`}>
                custom ({`['after']`})
              </button>
            }
          >
            <strong>Requested:</strong> above · fallbacks: <code>after</code>, <code>below</code>
          </InlineAnchored>
        </div>
      </div>
    </section>
  </div>
);
