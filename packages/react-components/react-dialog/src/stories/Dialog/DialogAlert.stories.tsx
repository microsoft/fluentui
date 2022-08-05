import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';
import story from './DialogAlert.md';

export const AlertDialog = () => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger>
        <Button>Open Alert dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-label="label">
        <DialogTitle>Alert dialog title</DialogTitle>
        <DialogBody>
          This dialog cannot be dismissed by clicking on the backdrop nor by pressing Escape. Close button should be
          pressed to dismiss this Alert
        </DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

AlertDialog.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
