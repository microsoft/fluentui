import * as React from 'react';

import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from './getStoryVariant';
import { Button } from '@fluentui/react-button';

describe('utility functions', () => {
  describe('getStoryVariant', () => {
    const DefaultStory = () => <Button> Hello World</Button>;

    it('should set the correct direction for story', () => {
      const ltrStory = getStoryVariant(DefaultStory, DARK_MODE);
      const rtlStory = getStoryVariant(DefaultStory, RTL);

      expect(ltrStory.parameters.dir).toBe('ltr');
      expect(rtlStory.parameters.dir).toBe('rtl');
    });

    it('should set the correct theme for story', () => {
      const darkModeStory = getStoryVariant(DefaultStory, DARK_MODE);
      const highContrastStory = getStoryVariant(DefaultStory, HIGH_CONTRAST);

      expect(darkModeStory.parameters.fluentTheme).toBe('web-dark');
      expect(highContrastStory.parameters.fluentTheme).toBe('teams-high-contrast');
    });
  });
});
