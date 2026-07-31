import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ToggleButton, Portal } from '@fluentui/react-components';

import styles from './PortalDefault.module.css';

export const Default = (): JSXElement => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.clippingContainer}>
          <span>Clipping parent container</span>

          {open && mountNode && (
            <Portal mountNode={mountNode}>
              <div className={styles.portalContent}>Portal content</div>
            </Portal>
          )}
        </div>

        <div className={styles.controls}>
          <ToggleButton checked={open} onClick={() => setOpen(!open)}>
            Toggle portal
          </ToggleButton>

          <code className={styles.state}>{JSON.stringify({ open }, null, 2)}</code>
        </div>
      </div>

      <div ref={setMountNode} />
    </>
  );
};
