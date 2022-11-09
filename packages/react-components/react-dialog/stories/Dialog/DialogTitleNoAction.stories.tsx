import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogBody,
  Button,
} from '@fluentui/react-components';
import story from './DialogTitleNoAction.md';

export const TitleNoAction = () => {
  return (
    <Dialog modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
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
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

TitleNoAction.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
