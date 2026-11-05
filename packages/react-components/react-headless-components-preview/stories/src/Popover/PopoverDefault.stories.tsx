import * as React from 'react';
import { useId } from '@fluentui/react-components';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const Default = (): React.ReactNode => {
  const headingId = useId('popover-heading-');
  const bodyId = useId('popover-body-');

  return (
    <Popover>
      <PopoverTrigger>
        <button className={styles.trigger}>Show popover</button>
      </PopoverTrigger>
      {/* Text-only content: the surface itself receives focus on open, so it needs a name and description. */}
      <PopoverSurface className={styles.surface} aria-labelledby={headingId} aria-describedby={bodyId}>
        <h3 id={headingId} className={styles.heading}>
          Popover title
        </h3>
        <p id={bodyId} className={styles.body}>
          This is the content of the popover. Click the trigger again or press Escape to close.
        </p>
      </PopoverSurface>
    </Popover>
  );
};
