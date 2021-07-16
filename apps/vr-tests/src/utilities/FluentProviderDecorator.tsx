import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import * as React from 'react';

export const FluentProviderDecorator: DecoratorFunction<StoryFnReactReturnType> = story => (
  <FluentProvider theme={webLightTheme}>{story()}</FluentProvider>
);
