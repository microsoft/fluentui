'use client';

import * as React from 'react';
import { Input } from '@fluentui/react-components';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useStyles } from './SlotSketch.styles';

export const SlotSketch: ForwardRefComponent<React.ComponentProps<'div'>> = React.forwardRef((props, ref) => {
  const styles = useStyles();
  return (
    <div {...props} ref={ref}>
      <div className={styles.root}>
        <div className={styles.sketch}>
          <span className={styles.slot}>Before</span>Placeholder text<span className={styles.slot}>After</span>
        </div>
        <Input contentBefore={<span>www.</span>} contentAfter={<span>.com</span>} placeholder="domain name here" />
      </div>
    </div>
  );
});
SlotSketch.displayName = 'SlotSketch';
