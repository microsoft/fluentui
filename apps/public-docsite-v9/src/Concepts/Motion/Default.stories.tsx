import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Link,
  Button,
} from '@fluentui/react-components';

export const Default = () => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Default</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Surface motion and backdrop are enabled</DialogTitle>
          <DialogContent>
            Dialog has <b>surfaceMotion</b> slot, built with{' '}
            <Link href="https://react.fluentui.dev/?path=/docs/motion-apis-createpresencecomponent--docs">
              createPresenceComponent
            </Link>{' '}
            for scale animation.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <Button appearance="primary">Do Something</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
