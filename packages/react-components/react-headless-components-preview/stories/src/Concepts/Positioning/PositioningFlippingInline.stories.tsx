import * as React from 'react';
import { InlineAnchored } from './InlineAnchored';

import descriptionMd from './PositioningFlippingInlineDescription.md';
import styles from './positioning.module.css';

export const FlippingInline = (): React.ReactNode => (
  <div className={styles.page}>
    <div className={styles.grid}>
      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'before' }}
          surfaceClassName={`${styles.surfaceFlipNarrow} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinLeftCenter}`}>trigger on left</button>
          }
        >
          <strong>Requested:</strong> before → flips after
        </InlineAnchored>
      </div>

      <div className={styles.demoBox}>
        <InlineAnchored
          positioning={{ position: 'after' }}
          surfaceClassName={`${styles.surfaceFlipNarrow} ${styles.flipReadout}`}
          trigger={
            <button className={`${styles.trigger} ${styles.triggerSm} ${styles.pinRightCenter}`}>
              trigger on right
            </button>
          }
        >
          <strong>Requested:</strong> after → flips before
        </InlineAnchored>
      </div>
    </div>
  </div>
);

FlippingInline.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
