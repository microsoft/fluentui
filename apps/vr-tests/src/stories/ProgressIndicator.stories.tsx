import * as React from 'react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';
import { ProgressIndicator } from '@fluentui/react';

export default {
  title: 'ProgressIndicator',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
};

export const _0 = () => (
  <ProgressIndicator label="Example title" description="Example description" percentComplete={0} />
);

_0.storyName = '0%';

export const _50 = () => (
  <ProgressIndicator
    label="Example title"
    description="Example description"
    percentComplete={0.5}
  />
);

_50.storyName = '50%';

export const _50RTL = getStoryVariant(_50, RTL);

export const _100 = () => (
  <ProgressIndicator label="Example title" description="Example description" percentComplete={1} />
);

_100.storyName = '100%';
