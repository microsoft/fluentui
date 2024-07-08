import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  STORY_VARIANT,
  StoryWrightDecorator,
  TestWrapperDecorator,
} from '../utilities';
import { ProgressIndicator } from '@fluentui/react';

export default {
  title: 'ProgressIndicator',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
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

export const _50RTL = getStoryVariant(_50, STORY_VARIANT.RTL);

export const _100 = () => (
  <ProgressIndicator label="Example title" description="Example description" percentComplete={1} />
);

_100.storyName = '100%';
