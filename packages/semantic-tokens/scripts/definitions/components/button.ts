import { GroupPart } from '../groups.types';

// Group button tokens
export const buttonGroup: GroupPart = {
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
  ],
  variants: ['neutral', 'primary', 'outline', 'subtle'],
  variantStateProperties: ['background', 'stroke', 'foreground'],
  states: ['', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected', 'disabled'],
  components: ['button', 'splitbutton', 'togglebutton', 'menubutton', 'compoundbutton'],
  exceptions: [
    {
      // Outline buttons may modify strokeWidth based on state, as it is their main visual element
      variants: ['outline'],
      states: ['hover', 'pressed', 'selected'],
      variantStateProperties: ['strokewidth'],
    },
    {
      // Transparent state only modifies foreground color on state changes
      variants: ['transparent'],
      states: ['', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected', 'disabled'],
      variantStateProperties: ['foreground'],
    },
  ],
  parts: {
    icononly: {
      coreProperties: ['padding'],
    },
    icon: {
      states: ['', 'hover', 'pressed', 'disabled', 'selected'],
      coreProperties: ['size'],
      variants: ['neutral', 'primary', 'outline', 'subtle'],
      variantStateProperties: ['foreground'],
    },
    // divider: {
    //   coreProperties: ['strokewidth', 'margin.vertical'],
    //   variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
    //   variantProperties: ['stroke'],
    // },
    // chevron: {
    //   variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
    //   states: ['', 'hover', 'pressed', 'selected', 'disabled'],
    //   variantStateProperties: ['foreground'],
    //   scales: ['small', 'medium', 'large'],
    //   scaleProperties: ['size'],
    // },
    text: {
      coreProperties: ['padding.horizontal', 'fontsize', 'lineheight', 'fontweight'],
    },
  },
};
