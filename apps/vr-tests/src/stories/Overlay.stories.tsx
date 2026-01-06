import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';
import { Overlay } from '@fluentui/react';

export default {
  title: 'Overlay',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.ms-Overlay' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Overlay>;

export const Root = () => <Overlay>Overlay content</Overlay>;

export const RootRTL = getStoryVariant(Root, RTL);

export const Dark = () => <Overlay isDarkThemed>Overlay content</Overlay>;
