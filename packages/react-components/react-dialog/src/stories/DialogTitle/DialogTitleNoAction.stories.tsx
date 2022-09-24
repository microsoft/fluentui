import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogBody,
} from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';
import story from './DialogTitleNoAction.md';

export const NoAction = () => {
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger>
        <Button>Open non-modal dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle action={null}>Non-modal dialog title without an action</DialogTitle>
          <DialogContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
            laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
            Consequuntur, repellendus nostrum?
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="primary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

NoAction.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
