import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const Controlled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.columnSpacious}>
      <label className={styles.checkbox}>
        <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
        Popover open
      </label>
      <Popover open={open} onOpenChange={(_e, data) => setOpen(data.open)}>
        <PopoverTrigger>
          <button className={styles.trigger}>Controlled popover</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surface}>
          <p className={styles.body}>
            This popover is controlled externally. Toggle the checkbox above or click the trigger to open and close it.
          </p>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
