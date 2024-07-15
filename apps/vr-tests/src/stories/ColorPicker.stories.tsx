import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { ColorPicker, Fabric } from '@fluentui/react';

export default {
  title: 'ColorPicker',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

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
