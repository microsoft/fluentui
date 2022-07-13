import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogBody, DialogActions } from '@fluentui/react-dialog';
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
          <DialogBody>Dialog Content</DialogBody>
          <DialogActions>
            <DialogTrigger>
              <Button>Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
