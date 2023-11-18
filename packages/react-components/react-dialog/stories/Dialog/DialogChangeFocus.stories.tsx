import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components';

export const ChangeFocus = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (open && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogContent>This dialog focus on the second button instead of the first</DialogContent>
          <DialogActions position="start">
            <Button appearance="outline">Third Action</Button>
          </DialogActions>
          <DialogActions position="end">
            <DialogTrigger disableButtonEnhancement>
              <Button ref={buttonRef} appearance="secondary">
                Close
              </Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

ChangeFocus.parameters = {
  docs: {
    description: {
      story: 'Changing the default focused element can be done in an effect',
    },
  },
};
