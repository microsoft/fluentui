import { ComponentStory } from '@storybook/react';
import { DarkModeDecorator, HighContrastDecorator, RTLDecorator } from './StoryDecorators';

export const DARK_MODE = 'Dark Mode';
export const HIGH_CONTRAST = 'High Contrast';
export const RTL = 'RTL';

/**
 * Helper function that returns a RTL, Dark Mode or High Contrast variant of an existing story.
 */
export const getStoryVariant = (story: ComponentStory<any>, variant: 'RTL' | 'Dark Mode' | 'High Contrast') => {
  let decorator;

  if (variant === RTL) {
    decorator = RTLDecorator;
  }

  if (variant === DARK_MODE) {
    decorator = DarkModeDecorator;
  }

  if (variant === HIGH_CONTRAST) {
    decorator = HighContrastDecorator;
  }

  return {
    ...story,
    render: story,
    storyName: `${story.storyName} - ${variant}`,
    decorators: [decorator],
  };
};
