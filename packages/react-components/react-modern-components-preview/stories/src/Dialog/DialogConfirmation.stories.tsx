import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';
import { Button, useId } from '@fluentui/react-components';

export const Confirmation = (): React.ReactNode => {
  const dialogId = useId('dialog-');

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Delete file</Button>
      </DialogTrigger>
      <DialogSurface aria-labelledby={`${dialogId}-title`} aria-describedby={`${dialogId}-content`}>
        <DialogHeader>
          <DialogTitle id={`${dialogId}-title`}>Delete dialogSpec_final_FINAL_v3.jpg</DialogTitle>
        </DialogHeader>
        <DialogBody id={`${dialogId}-content`}>This action is permanent. Are you sure you want to continue?</DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="primary">Delete file</Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button appearance="secondary">Cancel</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

Confirmation.parameters = {
  docs: {
    description: {
      story:
        "A confirmation dialog is a type of very short dialog that sends focus directly to an action button, usually at the end of the dialog. For this type of dialog it makes sense to set the dialog's accessible name to the title, and the accessible description to the content via `aria-labelledby` and `aria-describedby`. This should not be done for dialogs with longer content.",
    },
  },
};
