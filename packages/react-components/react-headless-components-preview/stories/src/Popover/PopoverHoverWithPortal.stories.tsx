import * as React from 'react';
import { Portal } from '@fluentui/react-components';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const HoverWithPortal = (): React.ReactNode => {
  const [mountNode, setMountNode] = React.useState<HTMLDivElement | null>(null);
  return (
    <>
      <Popover openOnHover>
        <PopoverTrigger>
          <button className={styles.trigger}>Hover to open Portal content</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surface}>
          <p className={styles.body}>
            Hover the portalled button, focus it, then press Tab without moving the pointer. Both panels stay visible
            until the pointer leaves.
          </p>
          {mountNode && (
            <Portal mountNode={mountNode}>
              <div className={styles.surface}>
                <button className={styles.trigger}>Portalled hover content</button>
              </div>
            </Portal>
          )}
        </PopoverSurface>
      </Popover>
      <div ref={setMountNode} className={styles.portalTarget} />
      <button className={styles.trigger}>After portalled hover content</button>
    </>
  );
};
