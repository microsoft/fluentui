import * as React from 'react';
import { Popover, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const WithoutTrigger = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const [buttonEl, setButtonEl] = React.useState<HTMLButtonElement | null>(null);

  return (
    <div className={styles.columnSpacious}>
      <button ref={setButtonEl} className={styles.trigger} onClick={() => setOpen(value => !value)}>
        Toggle popover
      </button>
      <Popover open={open} onOpenChange={(_e, data) => setOpen(data.open)} positioning={{ target: buttonEl }}>
        <PopoverSurface className={`${styles.surface} ${styles.surfaceColumn}`}>
          <h3 className={styles.headingFlush}>Popover content</h3>
          <p className={styles.body}>
            This popover has no <code>PopoverTrigger</code>. The surface is controlled externally and anchored to the
            button via the <code>positioning.target</code> prop.
          </p>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
