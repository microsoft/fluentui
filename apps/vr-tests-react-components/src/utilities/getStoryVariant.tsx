import * as React from 'react';
import type { Args, Decorator, StoryFn, StoryObj } from '@storybook/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme, webDarkTheme, teamsHighContrastTheme, type Theme } from '@fluentui/react-theme';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

type StoryVariant = typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL;

function isStoryFn(story: StoryFn | StoryObj): story is StoryFn {
  return typeof story === 'function';
}

interface StoryObjVariant extends StoryObj {
  storyName: string;
  parameters: StoryObj['parameters'] & { dir: ReturnType<typeof getDir>; theme: Theme; mode: 'vr-test' };
}

/** Helper function that returns RTL, Dark Mode or High Contrast variant of an existing story. */
export function getStoryVariant(story: StoryFn | StoryObj, variant: StoryVariant): StoryObjVariant {
  const theme = getTheme(variant);
  const dir = getDir(variant);
  const decorators = story.decorators ?? [];

  return {
    ...story,
    render: isStoryFn(story) ? story : story.render,
    storyName: `${getStoryName(story)} - ${variant}`,
    parameters: {
      ...story.parameters,
      dir,
      mode: 'vr-test',
      theme,
    },
    decorators: [...(Array.isArray(decorators) ? decorators : [decorators]), StoryVariantDecorator],
  } satisfies StoryObjVariant;
}

const StoryVariantDecorator: Decorator = (storyFn, context) => {
  return (
    <FluentProvider applyStylesToPortals={false} theme={context.parameters.theme} dir={context.parameters.dir}>
      {storyFn(context)}
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

function getStoryName<TArgs = Args>({ name, storyName }: StoryFn<TArgs> | StoryObj<TArgs>) {
  return storyName ?? name?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
