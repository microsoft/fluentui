import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

import story from './DialogNoFocusableElement.md';

export const NoFocusableElement = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>Open modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogBody>
            <p>⛔️ A Dialog without focusable elements is not recommended!</p>
            <p>⛔️ Escape key doesn't work here</p>
            <p>✅ Backdrop click still works to ensure this modal can be closed</p>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog modalType="non-modal">
        <DialogTrigger>
          <Button>Open non-modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle action={null}>Dialog Title</DialogTitle>
          <DialogBody>
            <p>⛔️ A Dialog without focusable elements is not recommended!</p>
            <p>⛔️ Escape key doesn't work</p>
            <p>⛔️ you're trapped!</p>
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
