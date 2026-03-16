import * as React from 'react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';
import { Layer } from '@fluentui/react';

export default {
  title: 'Layer',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default').end() },
  } satisfies StoryParameters,
};

export const Root = () => <Layer>Layer content</Layer>;

export const RootRTL = getStoryVariant(Root, RTL);
