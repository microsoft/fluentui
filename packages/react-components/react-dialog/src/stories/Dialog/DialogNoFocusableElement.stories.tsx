import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const NoFocusableElement = (props: Partial<DialogProps>) => {
  return (
    <>
      <Dialog {...props}>
        <DialogTrigger>
          <Button>Open modal dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle>Dialog Title</DialogTitle>
          <p>⚠️A Dialog without focusable elements is not recommended!⚠️</p>
          <p>Escape key and overlay click still works to ensure this modal can be closed</p>
        </DialogContent>
      </Dialog>
      <Dialog modalType="non-modal" {...props}>
        <DialogTrigger>
          <Button>Open non-modal dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle closeButton={null}>Dialog Title</DialogTitle>
          <p>⚠️A Dialog without focusable elements is not recommended!⚠️</p>
          <p>Escape key still works to ensure this modal can be closed</p>
        </DialogContent>
      </Dialog>
    </>
  );
};
