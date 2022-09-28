import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogBody,
} from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Nested = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open nested dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogActions>
            <Dialog>
              <DialogTrigger>
                <Button appearance="primary">Open inner dialog</Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Inner dialog title</DialogTitle>
                  <DialogContent>
                    ⛔️ just because you can doesn't mean you should have nested dialogs ⛔️
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger>
                      <Button appearance="primary">Close</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </DialogActions>
        </DialogBody>
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
