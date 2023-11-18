import { ComponentStory } from '@storybook/react';
import { parameters } from '@fluentui/react-storybook-addon';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

const theme = {
  'Dark Mode': 'web-dark',
  'High Contrast': 'teams-high-contrast',
} as const;

type Variant = typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL;

/**
 * Helper function that returns a RTL, Dark Mode or High Contrast variant of an existing story.
 */
export const getStoryVariant = (story: ComponentStory<any>, variant: Variant) => {
  const fluentTheme = getTheme(variant);
  const dir = getDir(variant);

  return {
    ...story,
    render: story,
    storyName: `${getStoryName(story)} - ${variant}`,
    parameters: parameters({ fluentTheme, dir, mode: 'vr-test' }),
  };
};

function getTheme(variant: Variant) {
  if (variant === 'RTL') {
    return 'web-light';
  }
  return theme[variant];
}

function getDir(variant: Variant) {
  if (variant !== 'RTL') {
    return 'ltr';
  }
  return 'rtl';
}

function getStoryName(story: ComponentStory<any>) {
  if (story.storyName) {
    return story.storyName;
  }

  return story.name.replace(/([a-z])([A-Z])/g, '$1 $2');
}
