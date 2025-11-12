import { GroupPart } from '../groups.types';

// Group button tokens
export const fluentButtonGroup: GroupPart = {
  components: ['button', 'splitbutton', 'togglebutton', 'menubutton', 'compoundbutton'],
  exceptions: [
    {
      // The primary button can be light or dark in unselected state, needs it's own lightness adjustments
      variants: ['primary'],
      states: ['hover', 'pressed'],
      variantStateProperties: ['lightness'],
    },
  ],
  parts: {
    icon: {
      exceptions: [
        {
          // Some monochrome selected buttons rely on strokewidth to define selected state
          variants: ['subtle'],
          states: ['hover'],
          variantStateProperties: ['foreground'],
        },
      ],
    },
  },
};
