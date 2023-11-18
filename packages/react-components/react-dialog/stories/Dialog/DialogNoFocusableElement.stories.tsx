import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogContent,
  DialogTitle,
  DialogBody,
  Button,
} from '@fluentui/react-components';

import story from './DialogNoFocusableElement.md';

export const NoFocusableElement = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>
              <p>⛔️ A Dialog without focusable elements is not recommended!</p>
              <p>✅ Escape key works</p>
              <p>✅ Backdrop click still works to ensure this modal can be closed</p>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog modalType="non-modal">
        <DialogTrigger disableButtonEnhancement>
          <Button>Open non-modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle action={null}>Dialog Title</DialogTitle>
            <DialogContent>
              <p>⛔️ A modal Dialog without focusable elements is not recommended!</p>
              <p>✅ Escape key works</p>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

NoFocusableElement.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
