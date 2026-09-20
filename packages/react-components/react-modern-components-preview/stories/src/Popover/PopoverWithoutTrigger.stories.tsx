import * as React from 'react';
import { Button, makeStyles, useId } from '@fluentui/react-components';
import type { PositioningImperativeRef } from '@fluentui/react-components';
import { Popover, PopoverSurface } from '@fluentui/react-modern-components-preview/popover';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
  },

  contentHeader: {
    marginTop: '0',
  },
});

export const WithoutTrigger = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const headerId = useId();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const styles = useStyles();

  React.useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  return (
    <div className={styles.container}>
      <Button ref={buttonRef} onClick={() => setOpen(currentOpen => !currentOpen)}>
        Toggle popover
      </Button>
      <Popover
        onOpenChange={(event, data) => {
          if (event.target === buttonRef.current) {
            // Ignore events that are triggered by the button to avoid re-opening the popover
            return;
          }

          setOpen(data.open);
        }}
        trapFocus
        open={open}
        positioning={{ positioningRef }}
      >
        <PopoverSurface aria-labelledby={headerId}>
          <div>
            <h3 id={headerId} className={styles.contentHeader}>
              Popover content
            </h3>

            <div>This is some popover content</div>
          </div>

          <div>
            <Button>Action</Button>
            <Button>Action</Button>
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
};

WithoutTrigger.parameters = {
  docs: {
    description: {
      story: [
        'When using a `Popover` without a `PopoverTrigger`, set its positioning target imperatively and provide',
        'the appropriate accessible trigger markup and keyboard interactions. With `trapFocus`, the native dialog',
        'surface restores focus to the element that was focused before it opened when the `Popover` closes.',
      ].join(' '),
    },
  },
};
