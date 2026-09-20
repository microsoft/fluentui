import * as React from 'react';
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-modern-components-preview/dialog';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import story from './DialogTitleCustomAction.md';

export const TitleCustomAction = (): React.ReactNode => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogTrigger action="close">
            <Button appearance="subtle" aria-label="close" icon={<Dismiss24Regular />} />
          </DialogTrigger>
        </DialogHeader>
        <DialogBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
          laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
          Consequuntur, repellendus nostrum?
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

TitleCustomAction.parameters = { docs: { description: { story } } };
