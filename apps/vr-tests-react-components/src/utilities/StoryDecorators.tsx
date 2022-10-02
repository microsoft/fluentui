import * as React from 'react';
import { DecoratorFunction } from '@storybook/addons';
import { webLightTheme, teamsHighContrastTheme, webDarkTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import { ExtendedStoryFnReturnType } from './types';

export const DarkModeDecorator: DecoratorFunction<ExtendedStoryFnReturnType> = story => {
  return <FluentProvider theme={webDarkTheme}>{story()}</FluentProvider>;
};

export const HighContrastDecorator: DecoratorFunction<ExtendedStoryFnReturnType> = story => {
  return <FluentProvider theme={teamsHighContrastTheme}>{story()}</FluentProvider>;
};

export const RTLDecorator: DecoratorFunction<ExtendedStoryFnReturnType> = story => {
  return (
    <FluentProvider theme={webLightTheme} dir="rtl">
      {story()}
    </FluentProvider>
  );
};
