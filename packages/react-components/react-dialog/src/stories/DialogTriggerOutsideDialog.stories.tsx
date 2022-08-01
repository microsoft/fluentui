import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogTrigger } from '@fluentui/react-dialog';
import story from './DialogTriggerOutsideDialog.md';

export const TriggerOutsideDialog = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      </DialogTrigger>
      <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </>
  );
};

TriggerOutsideDialog.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
