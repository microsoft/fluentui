import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Overlay } from '@fluentui/react';

export default {
  title: 'Overlay',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.ms-Overlay' }).end()),
  ],
};

export const Root = () => <Overlay>Overlay content</Overlay>;

export const RootRTL = getStoryVariant(Root, RTL);

export const Dark = () => <Overlay isDarkThemed>Overlay content</Overlay>;
