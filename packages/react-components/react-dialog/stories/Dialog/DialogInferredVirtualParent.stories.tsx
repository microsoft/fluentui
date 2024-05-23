import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  useRestoreFocusTarget,
  Field,
  Checkbox,
} from '@fluentui/react-components';
import story from './DialogInferredVirtualParent.md';

export const InferredVirtualParent = () => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <Field>
        <Checkbox
          label="inferVirtualParent"
          checked={checked}
          onChange={(e, data) => setChecked(Boolean(data.checked))}
        />
      </Field>
      <Popover trapFocus={true}>
        <PopoverTrigger>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <Button {...useRestoreFocusTarget()} onClick={() => setOpen(true)}>
            Open dialog
          </Button>
        </PopoverSurface>
      </Popover>
      <Dialog inferVirtualParent={checked} open={open} onOpenChange={(e, data) => setOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              The correct behaviour should mean that clicking inside this dialog will not close the popup the Dialog was
              opened from
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

InferredVirtualParent.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
