import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';

export const Default = (props: Partial<DialogProps>) => (
  <Dialog {...props}>
    <DialogTrigger>
      <button>Open dialog</button>
    </DialogTrigger>
    <DialogContent>Dialog Content</DialogContent>
  </Dialog>
);
