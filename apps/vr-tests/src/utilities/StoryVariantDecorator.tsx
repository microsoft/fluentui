import * as React from 'react';
import type { Args, Decorator, StoryFn } from '@storybook/react';
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider } from '@fluentui/react';
import { DarkTheme } from '@fluentui/theme-samples';

const StoryVariantDecorator: Decorator = (storyFn, context) => {
  const { dir, theme } = context.parameters;

  setRTL(dir === 'rtl');

  return theme ? (
    <ThemeProvider applyTo="element" theme={theme}>
      {storyFn(context)}
    </ThemeProvider>
  ) : (
    storyFn(context)
  );
};

export const DARK_MODE = 'Dark Mode';
export const RTL = 'RTL';

type StoryVariant = typeof DARK_MODE | typeof RTL;

/** Helper function that returns RTL or Dark Mode variant of an existing story. */
export function getStoryVariant<TArgs = Args>(story: StoryFn<TArgs>, variant: StoryVariant) {
  const decorators = story.decorators ?? [];

  const theme = getTheme(variant);
  const dir = getDir(variant);

  return {
    ...story,
    render: story,
    storyName: `${getStoryName(story)} - ${variant}`,
    parameters: { ...story.parameters, dir, theme },
    decorators: [...(Array.isArray(decorators) ? decorators : [decorators]), StoryVariantDecorator],
  };
}

function getTheme(variant: StoryVariant) {
  return variant === DARK_MODE ? DarkTheme : undefined;
}

function getDir(variant: StoryVariant) {
  return variant === RTL ? 'rtl' : 'ltr';
}

function getStoryName<TArgs = Args>({ name, storyName }: StoryFn<TArgs>) {
  return storyName ?? name?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
