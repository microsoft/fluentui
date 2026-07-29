import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';
import story from './DialogNestedDialogs.md';

export const NestedDialogsWithTrigger = (): JSXElement => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary">Open Outer Dialog</Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle>Outer Dialog</DialogTitle>
          <DialogContent>
            This is the outer dialog. Click the button below to open a nested dialog. When using DialogTrigger, focus is
            automatically restored.
          </DialogContent>
          <DialogActions>
            <Dialog>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Open Inner Dialog</Button>
              </DialogTrigger>

              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Inner Dialog</DialogTitle>
                  <DialogContent>
                    This is a nested dialog inside the outer dialog. Focus will automatically be restored to the Open
                    Inner Dialog button when this one closes thanks to DialogTrigger.
                  </DialogContent>
                  <DialogActions>
                    <Button appearance="primary">Confirm</Button>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary">Close Inner Dialog</Button>
                    </DialogTrigger>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>

            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close Outer Dialog</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

NestedDialogsWithTrigger.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
