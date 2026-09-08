import * as React from 'react';
import { InlineAnchored } from './InlineAnchored';

import descriptionMd from './PositioningFlippingCornerDescription.md';
import styles from './positioning.module.css';

export const FlippingCorner = (): React.ReactNode => (
  <div className={styles.page}>
    <div className={styles.grid}>
      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'above', align: 'end' }}
          surfaceClassName={`${styles.surfaceFlipWide} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopLeft}`}>
              top-left · requested above-end
            </button>
          }
        >
          <strong>Requested:</strong> above-end → below-start
        </InlineAnchored>
      </div>

      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'above', align: 'start' }}
          surfaceClassName={`${styles.surfaceFlipWide} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopRight}`}>
              top-right · requested above-start
            </button>
          }
        >
          <strong>Requested:</strong> above-start → below-end
        </InlineAnchored>
      </div>

      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'below', align: 'end' }}
          surfaceClassName={`${styles.surfaceFlipWide} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinBottomLeft}`}>
              bottom-left · requested below-end
            </button>
          }
        >
          <strong>Requested:</strong> below-end → above-start
        </InlineAnchored>
      </div>

      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'below', align: 'start' }}
          surfaceClassName={`${styles.surfaceFlipWide} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinBottomRight}`}>
              bottom-right · requested below-start
            </button>
          }
        >
          <strong>Requested:</strong> below-start → above-end
        </InlineAnchored>
      </div>
    </div>
  </div>
);

FlippingCorner.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
