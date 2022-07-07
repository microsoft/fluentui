import * as React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@fluentui/react-dialog';
import type { DialogProps } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Default = (props: Partial<DialogProps>) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  return (
    <>
      <Dialog {...props} onOpenChange={console.log}>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent aria-label="label">
          <DialogTitle />
          {/* <Button>Button</Button> */}
          Dialog Content
        </DialogContent>
      </Dialog>
      <Button onClick={() => dialogRef.current?.showModal()}>Open native dialog</Button>
      <dialog ref={dialogRef}>oi</dialog>
    </>
  );
};
