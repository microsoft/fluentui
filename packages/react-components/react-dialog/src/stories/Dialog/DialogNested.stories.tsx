import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogActions } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Nested = (props: Partial<DialogProps>) => {
  return (
    <>
      <Dialog {...props} onOpenChange={console.log}>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogActions>
            <Dialog onOpenChange={console.log}>
              <DialogTrigger>
                <Button>Open inner dialog</Button>
              </DialogTrigger>
              <DialogContent aria-label="label">
                <DialogTitle>Inner Dialog Title</DialogTitle>
                <DialogActions>
                  <DialogTrigger action="close">
                    <Button>Close dialog</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
