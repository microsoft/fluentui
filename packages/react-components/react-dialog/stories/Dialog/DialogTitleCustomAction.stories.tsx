import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import story from './DialogTitleCustomAction.md';
import { Dismiss24Regular } from '@fluentui/react-icons';

export const TitleCustomAction = () => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close">
                <Button appearance="subtle" aria-label="close" icon={<Dismiss24Regular />} />
              </DialogTrigger>
            }
          >
            Dialog title
          </DialogTitle>
          <DialogContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, explicabo repudiandae impedit doloribus
            laborum quidem maxime dolores perspiciatis non ipsam, nostrum commodi quis autem sequi, incidunt cum?
            Consequuntur, repellendus nostrum?
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

TitleCustomAction.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
