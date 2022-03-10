import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { Dialog, DialogProps, DialogHeader, DialogBody, DialogFooter } from '../index';

export const AlertDialog = (props: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        aria-haspopup="true"
      >
        Open Dialog
      </Button>

      <Dialog type="alert" aria-labelledby="dialog-title" open={isOpen} {...props}>
        <DialogHeader id="dialog-title">Alert message</DialogHeader>
        <DialogBody>Do you want to send this message without a subject?</DialogBody>
        <DialogFooter>
          <Button appearance="primary" onClick={() => setIsOpen(false)}>
            Send
          </Button>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
