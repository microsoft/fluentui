import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecoratorTall } from '../utilities';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';

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

export default {
  title: 'Dialog',

  decorators: [
    TestWrapperDecoratorTall,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.ms-Dialog-main' }).end()),
  ],
};

export const Root = () => (
  <Dialog
    hidden={false}
    dialogContentProps={{ type: DialogType.normal, ...text }}
    modalProps={{ isBlocking: false }}
  >
    {footer}
  </Dialog>
);

export const RootRTL = getStoryVariant(Root, RTL);

export const WideDialog = () => (
  <Dialog
    hidden={false}
    dialogContentProps={{ type: DialogType.normal, ...text }}
    modalProps={{ isBlocking: false }}
    minWidth="500px"
    maxWidth="600px"
  >
    {footer}
  </Dialog>
);

export const LargeHeader = () => (
  <Dialog
    hidden={false}
    dialogContentProps={{ type: DialogType.largeHeader, ...text }}
    modalProps={{ isBlocking: false }}
  >
    {footer}
  </Dialog>
);

LargeHeader.storyName = 'Large header';

export const Blocking = () => (
  <Dialog
    hidden={false}
    dialogContentProps={{ type: DialogType.normal, ...text }}
    modalProps={{ isBlocking: true }}
  >
    {footer}
  </Dialog>
);
