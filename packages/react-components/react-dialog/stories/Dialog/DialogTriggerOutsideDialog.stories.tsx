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
  DialogOpenChangeData,
} from '@fluentui/react-components';
import story from './DialogTriggerOutsideDialog.md';

export const TriggerOutsideDialog = () => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [open, setOpen] = React.useState(false);
  const [closeAction, setCloseAction] = React.useState<DialogOpenChangeData['type'] | null>(null);

  React.useEffect(() => {
    // Prevents focusing on an initial render
    if (open || closeAction === null) {
      return;
    }

    triggerRef.current?.focus();
  }, [closeAction, open]);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          setCloseAction(null);
        }}
        ref={triggerRef}
      >
        Open Dialog
      </Button>

      <Dialog
        open={open}
        onOpenChange={(event, data) => {
          setOpen(data.open);
          setCloseAction(data.type);
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
