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
import { Button, useRestoreFocusTarget } from '@fluentui/react-components';
import story from './DialogTriggerOutsideDialog.md';

export const TriggerOutsideDialog = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (
    <>
      <Button {...restoreFocusTargetAttribute} onClick={() => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
          <DialogActions>
            <Button appearance="primary">Do Something</Button>
            <DialogTrigger>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
};

TriggerOutsideDialog.parameters = { docs: { description: { story } } };
