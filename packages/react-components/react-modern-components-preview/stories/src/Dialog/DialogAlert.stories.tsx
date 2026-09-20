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
import story from './DialogAlert.md';

export const Alert = (): React.ReactNode => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger>
        <Button>Open Alert dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Alert dialog title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          This dialog cannot be dismissed by clicking on the backdrop. Close button should be pressed to dismiss this
          Alert, or `Escape` keydown.
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

Alert.parameters = { docs: { description: { story } } };
