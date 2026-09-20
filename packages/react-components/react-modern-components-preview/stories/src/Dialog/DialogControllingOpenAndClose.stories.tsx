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
import story from './DialogControllingOpenAndClose.md';

export const ControllingOpenAndClose = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogBody>
        <DialogActions>
          <Button appearance="primary">Do Something</Button>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

ControllingOpenAndClose.parameters = { docs: { description: { story } } };
