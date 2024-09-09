import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, Button, makeStyles, Checkbox } from '@fluentui/react-components';

const useStyles = makeStyles({
  boundary: {
    border: '2px dashed red',
    padding: '20px',
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  trigger: {
    display: 'block',
    width: '150px',
  },
});

export const FlipBoundary = () => {
  const styles = useStyles();
  const [boundaryRef, setBoundaryRef] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Checkbox label="Open" checked={open} onChange={(e, data) => setOpen(data.checked as boolean)} />
      <div ref={setBoundaryRef} className={styles.boundary}>
        <Popover open={open} positioning={{ flipBoundary: boundaryRef, position: 'above', align: 'start' }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Position: above</Button>
          </PopoverTrigger>
          <PopoverSurface>Stays within the flip boundary</PopoverSurface>
        </Popover>

        <Popover open={open} positioning={{ position: 'below', align: 'start' }}>
          <PopoverTrigger disableButtonEnhancement>
            <Button className={styles.trigger}>Position: below</Button>
          </PopoverTrigger>
          <PopoverSurface>Overflows the flip boundary</PopoverSurface>
        </Popover>
      </div>
    </>
  );
};

FlipBoundary.parameters = {
  docs: {
    description: {
      story: [
        'The flip boundary can be configured manually so that the positioned element stays within bounds',
        'for different positions',
      ].join('\n'),
    },
  },
};
