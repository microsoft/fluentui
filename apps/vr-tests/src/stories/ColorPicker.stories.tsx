import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../utilities';
import { ColorPicker, Fabric } from '@fluentui/react';

export default {
  title: 'ColorPicker',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof ColorPicker>;

export const Root = () => (
  <Fabric>
    <ColorPicker
      color="#FFF"
      styles={{
        input: { fontFamily: 'Segoe UI' },
      }}
    />
  </Fabric>
);

export const RootRTL = getStoryVariant(Root, RTL);

export const Blue = () => (
  <Fabric>
    <ColorPicker
      color="#48B"
      styles={{
        input: { fontFamily: 'Segoe UI' },
      }}
    />
  </Fabric>
);
