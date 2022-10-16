import { ComponentStory } from '@storybook/react';
import { parameters } from '@fluentui/react-storybook-addon';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

/**
 * Helper function that returns a RTL, Dark Mode or High Contrast variant of an existing story.
 */
export const getStoryVariant = (
  story: ComponentStory<any>,
  variant: typeof DARK_MODE | typeof HIGH_CONTRAST | typeof RTL,
) => {
  const name = story.name.replace(/([a-z])([A-Z])/g, '$1 $2');
  const fluentTheme =
    variant === DARK_MODE ? 'web-dark' : variant === HIGH_CONTRAST ? 'teams-high-contrast' : 'web-light';
  const dir = variant === RTL ? 'rtl' : 'ltr';

  return {
    ...story,
    render: story,
    storyName: `${story.storyName ?? name} - ${variant}`,
    parameters: parameters({ fluentTheme, dir, mode: 'vr-test' }),
  };
};
