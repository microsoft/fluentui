import * as React from 'react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';
import { Label } from '@fluentui/react';

export default {
  title: 'Label',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
};

export const Root = () => <Label>I'm a label</Label>;

export const RootRTL = getStoryVariant(Root, RTL);

export const Disabled = () => <Label disabled>I'm a disabled label</Label>;

export const Required = () => <Label required>I'm a required label</Label>;
