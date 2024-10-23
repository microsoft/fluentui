import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogBody,
  Button,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import story from './DialogTriggerOutsideDialog.md';

export const TriggerOutsideDialog = () => {
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (
    <>
      <Button
        // restoreFocusTargetAttribute ensures that focus is restored to this button when the dialog closes
        {...restoreFocusTargetAttribute}
        onClick={() => {
          // it is the user responsibility to open the dialog
          setOpen(true);
        }}
      >
        Open Dialog
      </Button>

      <Dialog
        // this controls the dialog open state
        open={open}
        onOpenChange={(event, data) => {
          // it is the users responsibility to react accordingly to the open state change
          setOpen(data.open);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>

            <DialogActions>
              {/* DialogTrigger inside of a Dialog still works properly */}
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

TriggerOutsideDialog.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
