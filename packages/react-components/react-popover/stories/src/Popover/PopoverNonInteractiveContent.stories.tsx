import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Popover, PopoverSurface, PopoverTrigger, useId } from '@fluentui/react-components';

import styles from './PopoverNonInteractiveContent.module.css';

export const NonInteractiveContent = (): JSXElement => {
  const headingId = useId('popover-heading');

  return (
    <Popover>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface tabIndex={-1} aria-labelledby={headingId}>
        <h3 id={headingId} className={styles.contentHeader}>
          Popover content
        </h3>
        <p>This is some non-interactive popover content.</p>
      </PopoverSurface>
    </Popover>
  );
};

NonInteractiveContent.parameters = {
  docs: {
    description: {
      story: [
        'A `Popover` without interactive content is an edge case. Use a `Tooltip` for simple non-interactive content.',
        'If richer content requires a `Popover`, set `tabIndex={-1}` on `PopoverSurface` and give the surface an',
        'accessible name so its content is announced when it receives focus.',
      ].join(' '),
    },
  },
};
