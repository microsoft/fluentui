import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';
import { Button } from '@fluentui/react-components';

export const ChangeFocus = (): React.ReactNode => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogHeader>
        <DialogBody>This dialog focuses on the second button instead of the first</DialogBody>
        <DialogActions position="start">
          <Button appearance="outline">Third Action</Button>
        </DialogActions>
        <DialogActions position="end">
          <Button appearance="primary">Do Something</Button>
          <DialogTrigger>
            <Button ref={buttonRef} appearance="secondary">
              Close
            </Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

ChangeFocus.parameters = {
  docs: { description: { story: 'Changing the default focused element can be done in an effect' } },
};
