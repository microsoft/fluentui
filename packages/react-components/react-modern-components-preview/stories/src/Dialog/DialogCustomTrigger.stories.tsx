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
import { Button } from '@fluentui/react-components';
import story from './DialogCustomTrigger.md';

const CustomDialogTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>((props, ref) => {
  return (
    <Button {...props} ref={ref}>
      Custom Trigger
    </Button>
  );
});

export const CustomTrigger = (): React.ReactNode => {
  return (
    <Dialog>
      <DialogTrigger>
        <CustomDialogTrigger />
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogBody>
        <DialogActions>
          <Button appearance="primary">Do Something</Button>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

CustomTrigger.parameters = { docs: { description: { story } } };
