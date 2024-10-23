import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  RTL,
  StoryWrightDecorator,
  TestWrapperDecoratorFixedWidth,
} from '../../utilities';
import { Fabric, Calendar } from '@fluentui/react';

const date = new Date(2010, 1, 12);

export default {
  title: 'Calendar',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Root = () => (
  <Fabric>
    <Calendar value={date} />
  </Fabric>
);

export const RootRTL = getStoryVariant(Root, RTL);
