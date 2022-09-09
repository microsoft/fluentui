import * as React from 'react';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody } from '@fluentui/react-dialog';
import { Button } from '@fluentui/react-components';
import story from './DialogTitleCustomAction.md';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const CustomAction = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle
          action={
            <DialogTrigger action="close">
              <Button appearance="subtle" aria-label="close" icon={<Dismiss24Regular />} />
            </DialogTrigger>
          }
        >
          Dialog title
        </DialogTitle>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
          laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
          Consequuntur, repellendus nostrum?
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

CustomAction.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
