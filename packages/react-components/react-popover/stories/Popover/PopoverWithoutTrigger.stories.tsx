import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, useId, useRestoreFocusTarget } from '@fluentui/react-components';
import type { PositioningImperativeRef } from '@fluentui/react-components';
const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '10px',
  },

  contentHeader: {
    marginTop: '0',
  },
});

export const WithoutTrigger = () => {
  const [open, setOpen] = React.useState(false);
  const headerId = useId();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const styles = useStyles();
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  React.useEffect(() => {
    if (buttonRef.current) {
      positioningRef.current?.setTarget(buttonRef.current);
    }
  }, [buttonRef, positioningRef]);

  return (
    <div className={styles.container}>
      <Button {...restoreFocusTargetAttribute} ref={buttonRef} onClick={() => setOpen(s => !s)}>
        Toggle popover
      </Button>
      <Popover onOpenChange={(_, data) => setOpen(data.open)} trapFocus open={open} positioning={{ positioningRef }}>
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
        'When using a `Popover` without a `PopoverTrigger`, it is up to the user to make sure that the focus is restored correctly',
        'when the popover is closed. This can be done quite easily by using the `useRestoreFocusTarget` hook. The `Popover` already',
        'uses the `useRestoreFocusSource` hook directly, which will restore focus to the most recently focused target on close.',
      ].join('\n'),
    },
  },
};
