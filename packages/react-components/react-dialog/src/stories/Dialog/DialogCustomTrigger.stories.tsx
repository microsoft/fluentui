import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogTrigger } from '@fluentui/react-dialog';
import type { DialogTriggerChildProps } from '@fluentui/react-dialog';
import story from './DialogCustomTrigger.md';

const CustomDialogTrigger = React.forwardRef<HTMLButtonElement, Partial<DialogTriggerChildProps>>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <CustomDialogTrigger />
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

CustomTrigger.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
