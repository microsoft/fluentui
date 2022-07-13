import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogActions } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Nested = (props: Partial<DialogProps>) => {
  return (
    <>
      <Dialog {...props}>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle>Dialog title</DialogTitle>
          <DialogActions>
            <Dialog>
              <DialogTrigger>
                <Button appearance="primary">Open inner dialog</Button>
              </DialogTrigger>
              <DialogContent aria-label="label">
                <DialogTitle>Inner dialog title</DialogTitle>
                <DialogActions>
                  <DialogTrigger action="close">
                    <Button appearance="primary">Close</Button>
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
