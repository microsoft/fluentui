import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Default = (props: Partial<DialogProps>) => {
  return (
    <>
      <Dialog modalType="non-modal" {...props} onOpenChange={console.log}>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle>Dialog Title</DialogTitle>
          <Button>Button</Button>
          Dialog Content
        </DialogContent>
      </Dialog>
    </>
  );
};
