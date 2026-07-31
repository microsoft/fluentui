import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, Button, Checkbox } from '@fluentui/react-components';

import styles from './PositioningOverflowBoundary.module.css';

export const OverflowBoundary = () => {
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Checkbox label="Open" checked={open} onChange={(e, data) => setOpen(data.checked as boolean)} />
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Popover open={open} positioning={{ overflowBoundary: boundaryRef, position: 'below', align: 'start' }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Align: end</Button>
          </PopoverTrigger>
          <PopoverSurface>Stays within the overflow boundary</PopoverSurface>
        </Popover>

        <Popover open={open} positioning={{ position: 'above', align: 'start' }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Align: end</Button>
          </PopoverTrigger>
          <PopoverSurface>Overflows the overflow boundary</PopoverSurface>
        </Popover>
      </div>
    </>
  );
};

OverflowBoundary.parameters = {
  docs: {
    description: {
      story: [
        'The overflow boundary can be configured manually so that the positioned element stays within bounds',
        'for different alignments',
      ].join('\n'),
    },
  },
};
