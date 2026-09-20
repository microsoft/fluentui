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
import story from './DialogNonModal.md';

export const NonModal = (): React.ReactNode => {
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Non-modal dialog title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
          laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
          Consequuntur, repellendus nostrum?
        </DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button>Close</Button>
          </DialogTrigger>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

NonModal.parameters = { docs: { description: { story } } };
