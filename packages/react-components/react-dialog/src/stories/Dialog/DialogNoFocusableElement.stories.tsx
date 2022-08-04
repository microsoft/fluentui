import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

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
            <p>⚠️A Dialog without focusable elements is not recommended!⚠️</p>
            <p>Escape key and backdrop click still works to ensure this modal can be closed</p>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <Dialog modalType="non-modal">
        <DialogTrigger>
          <Button>Open non-modal dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogTitle closeButton={null}>Dialog Title</DialogTitle>
          <DialogBody>
            <p>⚠️A Dialog without focusable elements is not recommended!⚠️</p>
            <p>Escape key still works to ensure this modal can be closed</p>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

NoFocusableElement.parameters = {
  docs: {
    description: {
      story: '',
    },
  },
};
