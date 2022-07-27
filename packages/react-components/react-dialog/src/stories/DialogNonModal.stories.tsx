import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';
import story from './DialogNonModal.md';

export const NonModal = () => {
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogSurface aria-label="label">
        <DialogTitle>Non-modal dialog title</DialogTitle>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
          laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
          Consequuntur, repellendus nostrum?
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

NonModal.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
