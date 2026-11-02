import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
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

export const ChangeFocus = (): JSXElement => {
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
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger disableButtonEnhancement>
              <Button ref={buttonRef} appearance="secondary">
                Close
              </Button>
            </DialogTrigger>
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
