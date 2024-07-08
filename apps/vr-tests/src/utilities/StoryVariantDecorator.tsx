import * as React from 'react';
import type { Args, DecoratorFn, StoryFn, StoryObj } from '@storybook/react';
import { setRTL } from '@fluentui/react/lib/Utilities';
import { ThemeProvider } from '@fluentui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DarkTheme } from '@fluentui/theme-samples';

export const StoryVariantDecorator: DecoratorFn = (storyFn, context) => {
  setRTL(context.parameters.dir === 'rtl');

  return <ThemeProvider theme={context.parameters.theme}>{storyFn(context)}</ThemeProvider>;
};

/** A list of story variants that can be applied to stories. */
export const STORY_VARIANT = {
  DARK_MODE: 'Dark Mode',
  RTL: 'RTL',
} as const;

export type StoryVariant = (typeof STORY_VARIANT)[keyof typeof STORY_VARIANT];

/** Helper function that returns a RTL or Dark Mode variant of an existing story. */
export const getStoryVariant = <TArgs = Args,>(
  story: StoryFn<TArgs>,
  variant: StoryVariant,
): StoryObj<TArgs> => {
  const theme = getTheme(variant);
  const dir = getDir(variant);

  return {
    ...story,
    render: story,
    storyName: `${getStoryName(story)} - ${variant}`,
    parameters: { ...story.parameters, dir, theme },
  };
};

function getTheme(variant: StoryVariant) {
  return variant === STORY_VARIANT.DARK_MODE ? DarkTheme : undefined;
}

function getDir(variant: StoryVariant) {
  return variant === STORY_VARIANT.RTL ? 'rtl' : 'ltr';
}

function getStoryName<TArgs = Args>({ name, storyName }: StoryFn<TArgs>) {
  return storyName ?? name?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
