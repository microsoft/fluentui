import * as React from 'react';
import type { Args, Decorator, StoryObj } from '@storybook/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme, webDarkTheme, teamsHighContrastTheme } from '@fluentui/react-theme';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

type StoryVariant = typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL;

/**
 *
 * Helper function that returns RTL, Dark Mode or High Contrast variant of an existing story.
 * Note: Supports only CSF3 format
 */
export function getStoryVariant(story: StoryObj & { name: string }, variant: StoryVariant) {
  const theme = getTheme(variant);
  const dir = getDir(variant);
  const decorators = story.decorators ?? [];

  return {
    ...story,
    name: `${getStoryName(story)} - ${variant}`,
    parameters: {
      ...story.parameters,
      dir,
      mode: 'vr-test',
      theme,
    },
    decorators: [...(Array.isArray(decorators) ? decorators : [decorators]), StoryVariantDecorator],
  } satisfies StoryObj;
}

const StoryVariantDecorator: Decorator = (Story, context) => {
  return (
    <FluentProvider applyStylesToPortals={false} theme={context.parameters.theme} dir={context.parameters.dir}>
      <Story />
    </FluentProvider>
  );
};

/** A mapping of story variants to Fluent themes. */
const STORY_VARIANT_THEME = {
  [RTL]: webLightTheme,
  [DARK_MODE]: webDarkTheme,
  [HIGH_CONTRAST]: teamsHighContrastTheme,
} as const;

function getTheme(variant: StoryVariant) {
  return STORY_VARIANT_THEME[variant];
}

function getDir(variant: StoryVariant) {
  return variant === RTL ? 'rtl' : 'ltr';
}

function getStoryName<TArgs = Args>({ name }: StoryObj<TArgs>) {
  return name?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
