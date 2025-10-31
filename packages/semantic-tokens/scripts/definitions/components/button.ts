import { GroupPart } from '../groups.types';

// Group button tokens
export const buttonGroup: GroupPart = {
  components: ['button', 'splitbutton', 'togglebutton', 'menubutton', 'compoundbutton'],
  /**
   * Core properties for the button group
   * These cover simple overrides, or interfaces for complex CSS management
   */
  coreProperties: [
    'corner',
    'strokewidth',
    'fontfamily',
    'shadow',
    'padding.horizontal',
    'padding.top',
    'padding.bottom',
    'gap',
    'minwidth',
    'fontsize',
    'lineheight',
    'fontweight',
  ],
  variants: ['neutral', 'primary', 'outline', 'subtle'],
  variantProperties: [],
  variantStateProperties: ['background', 'stroke', 'foreground'],
  states: ['', 'selected', 'disabled'],
  exceptions: [
    {
      // Outline buttons may modify strokeWidth based on selected state, as it is their main visual element
      variants: ['outline'],
      states: ['selected'],
      variantStateProperties: ['strokewidth'],
    },
    {
      // Transparent state only modifies foreground color on state changes
      variants: ['transparent'],
      states: ['', 'selected', 'disabled'],
      variantStateProperties: ['foreground'],
    },
  ],
  parts: {
    lightness: {
      coreProperties: ['hover', 'pressed'],
    },
    icononly: {
      coreProperties: ['padding'],
    },
    icon: {
      coreProperties: ['size'],
      states: ['', 'disabled', 'selected'],
      variants: ['neutral', 'primary', 'outline', 'subtle'],
      variantStateProperties: ['foreground'],
    },
    text: {
      coreProperties: ['padding.horizontal'],
    },
  },
};
