import * as React from 'react';
import { InlineAnchored } from './InlineAnchored';

import descriptionMd from './PositioningFlippingBlockDescription.md';
import styles from './positioning.module.css';

export const FlippingBlock = (): React.ReactNode => (
  <div className={styles.page}>
    <div className={styles.grid}>
      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'above' }}
          surfaceClassName={`${styles.surfaceFlipNarrow} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinTopCenter}`}>trigger near top</button>
          }
        >
          <strong>Requested:</strong> above → flips below
        </InlineAnchored>
      </div>

      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'below' }}
          surfaceClassName={`${styles.surfaceFlipNarrow} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinBottomCenter}`}>
              trigger near bottom
            </button>
          }
        >
          <strong>Requested:</strong> below → flips above
        </InlineAnchored>
      </div>
    </div>
  </div>
);

FlippingBlock.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
