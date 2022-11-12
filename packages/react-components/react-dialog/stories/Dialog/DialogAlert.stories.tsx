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
import story from './DialogAlert.md';

export const Alert = () => {
  return (
    <Dialog modalType="alert">
      <DialogTrigger disableButtonEnhancement>
        <Button>Open Alert dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Alert dialog title</DialogTitle>
          <DialogContent>
            This dialog cannot be dismissed by clicking on the backdrop nor by pressing Escape. Close button should be
            pressed to dismiss this Alert
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

Alert.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
