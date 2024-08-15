import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { Text } from '@fluentui/react';

export default {
  title: 'Text',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Root = () => <Text>I'm default text</Text>;

export const RootRTL = getStoryVariant(Root, RTL);

export const Wrap = () => (
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Text>
);

export const NoWrap = () => (
  <Text nowrap>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Text>
);

NoWrap.storyName = 'No wrap';

export const Block = () => (
  <>
    <Text block>I am block text.</Text>
    <Text block>Since block is specified,</Text>
    <Text block>every block of text</Text>
    <Text block>gets its own line.</Text>
  </>
);
