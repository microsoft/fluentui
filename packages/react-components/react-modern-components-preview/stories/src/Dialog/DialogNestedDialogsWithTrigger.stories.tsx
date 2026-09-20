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
import story from './DialogNestedDialogs.md';

export const NestedDialogsWithTrigger = (): React.ReactNode => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button appearance="primary">Open Outer Dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Outer Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          This is the outer dialog. Click the button below to open a nested dialog. When using DialogTrigger, focus is
          automatically restored.
        </DialogBody>
        <DialogActions>
          <Dialog>
            <DialogTrigger>
              <Button appearance="primary">Open Inner Dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogHeader>
                <DialogTitle>Inner Dialog</DialogTitle>
              </DialogHeader>
              <DialogBody>
                This is a nested dialog inside the outer dialog. Focus will automatically be restored to the Open Inner
                Dialog button when this one closes thanks to DialogTrigger.
              </DialogBody>
              <DialogActions>
                <Button appearance="primary">Confirm</Button>
                <DialogTrigger>
                  <Button appearance="secondary">Close Inner Dialog</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogSurface>
          </Dialog>
          <DialogTrigger>
            <Button appearance="secondary">Close Outer Dialog</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

NestedDialogsWithTrigger.parameters = { docs: { description: { story } } };
