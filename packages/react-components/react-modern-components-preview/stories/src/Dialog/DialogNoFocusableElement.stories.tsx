import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';
import { Button } from '@fluentui/react-components';
import story from './DialogNoFocusableElement.md';

export const NoFocusableElement = (): React.ReactNode => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Open modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>⛔️ A Dialog without focusable elements is not recommended!</p>
            <p>✅ Escape key works</p>
            <p>✅ Backdrop click still works to ensure this modal can be closed</p>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog modalType="non-modal">
        <DialogTrigger>
          <Button>Open non-modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>⛔️ A modal Dialog without focusable elements is not recommended!</p>
            <p>✅ Escape key works</p>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

NoFocusableElement.parameters = { docs: { description: { story } } };
