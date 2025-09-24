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
  useId,
} from '@fluentui/react-components';

export const Confirmation = (): JSXElement => {
  const dialogId = useId('dialog-');
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Delete file</Button>
      </DialogTrigger>
      <DialogSurface aria-labelledby={`${dialogId}-title`} aria-describedby={`${dialogId}-content`}>
        <DialogBody>
          <DialogTitle id={`${dialogId}-title`}>Delete dialogSpec_final_FINAL_v3.jpg</DialogTitle>
          <DialogContent id={`${dialogId}-content`}>
            This action is permanent. Are you sure you want to continue?
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Delete file</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
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
