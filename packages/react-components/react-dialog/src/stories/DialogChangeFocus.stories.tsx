import * as React from 'react';
import {
  Dialog,
  DialogOpenChangeListener,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogBody,
  DialogActions,
} from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  thirdAction: {
    marginRight: 'auto',
    '@media screen and (max-width: 480px)': {
      marginRight: 'unset',
    },
  },
});

export const ChangeFocus = (props: Partial<DialogProps>) => {
  const styles = useStyles();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: DialogOpenChangeListener = (_, data) => setOpen(data.open);
  React.useEffect(() => {
    if (open && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [open]);
  return (
    <>
      <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>This dialog focus on the second button instead of first</DialogBody>
          <DialogActions>
            <Button className={styles.thirdAction} appearance="outline">
              Third Action
            </Button>
            <DialogTrigger>
              <Button ref={buttonRef} appearance="secondary">
                Close
              </Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
