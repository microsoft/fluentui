import * as React from 'react';
import type { Args, Decorator, StoryObj } from '@storybook/react-webpack5';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName, webDarkThemeClassName, teamsHighContrastThemeClassName } from '@fluentui/react-theme';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

type StoryVariant = typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL;

interface StoryObjVariant extends StoryObj {
  name: string;
  parameters: StoryObj['parameters'] & { dir: ReturnType<typeof getDir>; themeClassName: string; mode: 'vr-test' };
}

/**
 *
 * Helper function that returns RTL, Dark Mode or High Contrast variant of an existing story.
 * Note: Supports only CSF3 format
 */
export function getStoryVariant(story: StoryObj & { name: string }, variant: StoryVariant): StoryObjVariant {
  const themeClassName = getThemeClassName(variant);
  const dir = getDir(variant);
  const decorators = story.decorators ?? [];

  return {
    ...story,
    name: `${getStoryName(story)} - ${variant}`,
    parameters: {
      ...story.parameters,
      dir,
      mode: 'vr-test',
      themeClassName,
    },
    decorators: [...(Array.isArray(decorators) ? decorators : [decorators]), StoryVariantDecorator],
  } satisfies StoryObjVariant;
}

const StoryVariantDecorator: Decorator = (Story, context) => {
  return (
    <FluentProvider
      applyStylesToPortals={false}
      themeClassName={context.parameters.themeClassName}
      dir={context.parameters.dir}
    >
      <Story />
    </FluentProvider>
  );
};

/** A mapping of story variants to Fluent theme class names. */
const STORY_VARIANT_THEME_CLASS_NAME = {
  [RTL]: webLightThemeClassName,
  [DARK_MODE]: webDarkThemeClassName,
  [HIGH_CONTRAST]: teamsHighContrastThemeClassName,
} as const;

function getThemeClassName(variant: StoryVariant) {
  return STORY_VARIANT_THEME_CLASS_NAME[variant];
}

function getDir(variant: StoryVariant) {
  return variant === RTL ? 'rtl' : 'ltr';
}

function getStoryName<TArgs = Args>({ name }: StoryObj<TArgs>) {
  return name?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
