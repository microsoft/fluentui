import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

type CustomTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomTriggerButton = React.forwardRef<HTMLButtonElement, CustomTriggerProps>((props, ref) => (
  <button ref={ref} {...props} className={styles.trigger}>
    Custom trigger
  </button>
));

export const CustomTrigger = (): React.ReactNode => (
  <Popover>
    <PopoverTrigger>
      <CustomTriggerButton />
    </PopoverTrigger>
    <PopoverSurface className={styles.surface}>
      <h3 className={styles.heading}>Custom trigger</h3>
      <p className={styles.body}>
        Native elements and Fluent components have first-class support as children of <code>PopoverTrigger</code>. To
        use your own component, forward its ref with <code>React.forwardRef</code> so the popover can wire up the
        trigger ref and aria attributes.
      </p>
    </PopoverSurface>
  </Popover>
);
