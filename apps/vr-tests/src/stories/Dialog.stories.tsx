/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorTall } from '../utilities';
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
} from 'office-ui-fabric-react';

const footer = (
  <DialogFooter>
    <PrimaryButton text="Save" />
    <DefaultButton text="Cancel" />
  </DialogFooter>
);

const text = {
  title: 'All emails together',
  subText:
    'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.',
};

storiesOf('Dialog', module)
  .addDecorator(FabricDecoratorTall)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-Dialog-main' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory(
    'Root',
    () => (
      <Dialog
        hidden={false}
        dialogContentProps={{ type: DialogType.normal, ...text }}
        modalProps={{ isBlocking: false }}
      >
        {footer}
      </Dialog>
    ),
    { rtl: true },
  )
  .addStory('Wide Dialog', () => (
    <Dialog
      hidden={false}
      dialogContentProps={{ type: DialogType.normal, ...text }}
      modalProps={{ isBlocking: false }}
      minWidth="500px"
      maxWidth="600px"
    >
      {footer}
    </Dialog>
  ))
  .addStory('Large header', () => (
    <Dialog
      hidden={false}
      dialogContentProps={{ type: DialogType.largeHeader, ...text }}
      modalProps={{ isBlocking: false }}
    >
      {footer}
    </Dialog>
  ))
  .addStory('Blocking', () => (
    <Dialog
      hidden={false}
      dialogContentProps={{ type: DialogType.normal, ...text }}
      modalProps={{ isBlocking: true }}
    >
      {footer}
    </Dialog>
  ));
