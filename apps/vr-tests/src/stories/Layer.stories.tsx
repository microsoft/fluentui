import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Layer } from '@fluentui/react';

export default {
  title: 'Layer',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.ms-Layer' }).end()),
  ],
};

export const Root = () => <Layer>Layer content</Layer>;

export const RootRTL = getStoryVariant(Root, RTL);
