import * as React from 'react';
import type { Args, Decorator, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName, webDarkThemeClassName, teamsHighContrastThemeClassName } from '@fluentui/react-theme';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

type StoryVariant = typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL;

function isStoryFn(story: StoryFn | StoryObj): story is StoryFn {
  return typeof story === 'function';
}

interface StoryObjVariant extends StoryObj {
  storyName: string;
  parameters: StoryObj['parameters'] & { dir: ReturnType<typeof getDir>; themeClassName: string; mode: 'vr-test' };
}

/** Helper function that returns RTL, Dark Mode or High Contrast variant of an existing story. */
export function getStoryVariant(story: StoryFn | StoryObj, variant: StoryVariant): StoryObjVariant {
  const themeClassName = getThemeClassName(variant);
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
      themeClassName,
    },
    decorators: [...(Array.isArray(decorators) ? decorators : [decorators]), StoryVariantDecorator],
  } satisfies StoryObjVariant;
}

const StoryVariantDecorator: Decorator = (storyFn, context) => {
  return (
    <FluentProvider
      applyStylesToPortals={false}
      themeClassName={context.parameters.themeClassName}
      dir={context.parameters.dir}
    >
      {storyFn(context)}
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

function getStoryName<TArgs = Args>({ name, storyName }: StoryFn<TArgs> | StoryObj<TArgs>) {
  return storyName ?? name?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
