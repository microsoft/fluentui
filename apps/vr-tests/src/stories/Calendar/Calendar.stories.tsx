import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecoratorFixedWidth } from '../../utilities';
import { Fabric, Calendar } from '@fluentui/react';

const date = new Date(2010, 1, 12);

export default {
  title: 'Calendar',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Calendar>;

export const Root = () => (
  <Fabric>
    <Calendar value={date} />
  </Fabric>
);

export const RootRTL = getStoryVariant(Root, RTL);
