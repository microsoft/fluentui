import * as React from 'react';

import type { StoryFn } from '@storybook/react';
import { Button } from '@fluentui/react-button';

import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from './getStoryVariant';

describe('utility functions', () => {
  describe('getStoryVariant', () => {
    const DefaultStory: StoryFn = () => <Button> Hello World</Button>;

    it('should set the correct name for story', () => {
      const darkModeStory = getStoryVariant(DefaultStory, DARK_MODE);
      const highContrastStory = getStoryVariant(DefaultStory, HIGH_CONTRAST);
      const rtlStory = getStoryVariant(DefaultStory, RTL);

      expect(darkModeStory.storyName).toEqual('Default Story - Dark Mode');
      expect(highContrastStory.storyName).toEqual('Default Story - High Contrast');
      expect(rtlStory.storyName).toEqual('Default Story - RTL');

      const buttonStory = DefaultStory;
      buttonStory.storyName = 'button';

      const buttonDarkModeStory = getStoryVariant(buttonStory, DARK_MODE);
      const buttonHighContrastStory = getStoryVariant(buttonStory, HIGH_CONTRAST);
      const buttonRtlStory = getStoryVariant(buttonStory, RTL);

      expect(buttonDarkModeStory.storyName).toEqual('button - Dark Mode');
      expect(buttonHighContrastStory.storyName).toEqual('button - High Contrast');
      expect(buttonRtlStory.storyName).toEqual('button - RTL');
    });
  });
});
