import { GroupPart } from '../../definitions/groups.types';

// Fluent compound button control tokens
export const fluentCompoundButtonGroup: GroupPart = {
  coreProperties: ['icon.size', 'gap'],
  scales: ['small', 'medium', 'large'],
  scaleProperties: ['padding.horizontal', 'padding.top', 'padding.bottom', 'minwidth', 'minheight'],
  parts: {
    icononly: {
      scaleProperties: ['padding'],
      scales: ['small', 'medium', 'large'],
    },
  },
};

// Group button tokens
export const fluentButtonGroup: GroupPart = {
  components: ['button', 'splitbutton', 'togglebutton', 'menubutton', 'compoundbutton'],
  /**
   * Core properties for the button group
   * These cover simple overrides, or interfaces for complex CSS management
   */
  variants: ['neutral', 'primary', 'outline', 'subtle', 'corner'],
  variantProperties: [],
  variantStateProperties: ['background', 'stroke', 'foreground'],
  scales: ['small', 'large'],
  scaleProperties: [
    'padding.horizontal',
    'padding.top',
    'padding.bottom',
    'gap',
    'minwidth',
    'fontsize',
    'lineheight',
    'fontweight',
  ],
  states: ['hover', 'pressed', 'hover.selected', 'pressed.selected'],
  exceptions: [
    {
      // Transparent state only modifies foreground color on state changes
      variants: ['transparent'],
      states: ['hover', 'pressed', 'hover.selected', 'pressed.selected'],
      variantStateProperties: ['foreground'],
    },
  ],
  parts: {
    icononly: {
      scaleProperties: ['padding'],
      scales: ['small', 'large'],
    },
    icon: {
      states: ['hover', 'pressed', 'selected.hover', 'selected.pressed'],
      scales: ['small', 'large'],
      scaleProperties: ['size'],
      variants: ['neutral', 'primary', 'outline', 'subtle'],
      variantStateProperties: ['foreground'],
    },
    text: {
      scales: ['small', 'large'],
      scaleProperties: ['padding.horizontal'],
    },
  },
};
