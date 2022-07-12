import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const NonModal = (props: Partial<DialogProps>) => {
  return (
    <>
      <Dialog modalType="non-modal" {...props}>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle>Dialog Title</DialogTitle>
          Dialog Content
          <DialogTrigger>
            <Button>Close</Button>
          </DialogTrigger>
        </DialogContent>
      </Dialog>
    </>
  );
};
