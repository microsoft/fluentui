import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  STORY_VARIANT,
  StoryWrightDecorator,
  TestWrapperDecorator,
} from '../utilities';
import { Label } from '@fluentui/react';

export default {
  title: 'Label',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Root = () => <Label>I'm a label</Label>;

export const RootRTL = getStoryVariant(Root, STORY_VARIANT.RTL);

export const Disabled = () => <Label disabled>I'm a disabled label</Label>;

export const Required = () => <Label required>I'm a required label</Label>;
