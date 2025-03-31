import * as React from 'react';
import type { Decorator } from '@storybook/react';
import { ThemeProvider } from '@fluentui/react';

/**
 * A decorator that wraps the story in a v8 `ThemeProvider` component.
 * @returns The decorator function.
 */
export const ThemeProviderDecorator: Decorator = (story, context) => (
  <ThemeProvider> {story(context)} </ThemeProvider>
);
