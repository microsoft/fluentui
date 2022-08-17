import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogActions, DialogBody } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Nested = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogActions>
          <Dialog>
            <DialogTrigger>
              <Button appearance="primary">Open inner dialog</Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogTitle>Inner dialog title</DialogTitle>
              <DialogBody>⚠️ just because you can doesn't mean you should have nested dialogs ⚠️</DialogBody>
              <DialogActions>
                <DialogTrigger>
                  <Button appearance="primary">Close</Button>
                </DialogTrigger>
              </DialogActions>
            </DialogSurface>
          </Dialog>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

Nested.parameters = {
  docs: {
    description: {
      story: '',
    },
  },
};
