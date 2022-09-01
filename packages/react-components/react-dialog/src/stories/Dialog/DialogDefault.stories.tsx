import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';

export const Default = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open dialog</Button>
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
