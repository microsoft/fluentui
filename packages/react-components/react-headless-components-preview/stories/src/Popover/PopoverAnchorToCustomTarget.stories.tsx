import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const AnchorToCustomTarget = (): React.ReactNode => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  return (
    <div className={styles.outerPad}>
      <div className={styles.cluster}>
        <div className={styles.column}>
          <span className={styles.fieldLabel}>Custom anchor (target)</span>
          <button ref={setTarget} className={`${styles.trigger} ${styles.triggerSecondary}`}>
            Anchor
          </button>
        </div>

        <div className={styles.column}>
          <span className={styles.fieldLabel}>Popover trigger (unrelated)</span>
          <Popover positioning={{ target, position: 'below', offset: 4 }}>
            <PopoverTrigger>
              <button className={styles.trigger}>Open popover</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surface} ${styles.surfaceColumn}`}>
              <h3 className={styles.headingFlush}>Popover content</h3>
              <p className={styles.body}>
                Clicking <em>Open popover</em> toggles this surface, but <code>positioning.target</code> makes it anchor
                to the magenta <em>Anchor</em> button instead of the trigger. It appears to the right of the anchor
                regardless of where the trigger sits.
              </p>
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </div>
  );
};
