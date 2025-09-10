import * as React from 'react';
import { type StoryObj } from '@storybook/react';

import { Button } from '@fluentui/react-button';
import { webDarkTheme, teamsHighContrastTheme } from '@fluentui/react-theme';

import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from './getStoryVariant';

describe('getStoryVariant', () => {
  const DefaultStory = { render: () => <Button> Hello World</Button>, name: 'Default Story' } satisfies StoryObj;

  it('should set the correct direction for story', () => {
    const ltrStory = getStoryVariant(DefaultStory, DARK_MODE);
    const rtlStory = getStoryVariant(DefaultStory, RTL);

    expect(ltrStory.parameters.dir).toBe('ltr');
    expect(rtlStory.parameters.dir).toBe('rtl');
  });

  it('should set the correct theme for story', () => {
    const darkModeStory = getStoryVariant(DefaultStory, DARK_MODE);
    const highContrastStory = getStoryVariant(DefaultStory, HIGH_CONTRAST);

    expect(darkModeStory.parameters.theme).toEqual(webDarkTheme);
    expect(highContrastStory.parameters.theme).toEqual(teamsHighContrastTheme);
  });

  it('should set the correct name for story', () => {
    const darkModeStory = getStoryVariant(DefaultStory, DARK_MODE);
    const highContrastStory = getStoryVariant(DefaultStory, HIGH_CONTRAST);
    const rtlStory = getStoryVariant(DefaultStory, RTL);
    expect(darkModeStory.name).toEqual('Default Story - Dark Mode');
    expect(highContrastStory.name).toEqual('Default Story - High Contrast');
    expect(rtlStory.name).toEqual('Default Story - RTL');

    const buttonStory = { ...DefaultStory } satisfies StoryObj;
    buttonStory.name = 'button';

    const buttonDarkModeStory = getStoryVariant(buttonStory, DARK_MODE);
    const buttonHighContrastStory = getStoryVariant(buttonStory, HIGH_CONTRAST);
    const buttonRtlStory = getStoryVariant(buttonStory, RTL);
    expect(buttonDarkModeStory.name).toEqual('button - Dark Mode');
    expect(buttonHighContrastStory.name).toEqual('button - High Contrast');
    expect(buttonRtlStory.name).toEqual('button - RTL');
  });
});
