import { GroupPart } from '../groups.types';

// Group button tokens
export const buttonGroup: GroupPart = {
  /**
   * Core properties for the button group
   * These cover simple overrides, or interfaces for complex CSS management
   */
  coreProperties: ['corner', 'strokewidth', 'fontfamily', 'shadow'],
  variants: ['neutral', 'primary', 'outline', 'subtle'],
  variantProperties: [],
  variantStateProperties: ['background', 'stroke', 'foreground'],
  scales: ['small', 'medium', 'large'],
  scaleProperties: ['padding.horizontal', 'padding.top', 'padding.bottom', 'gap', 'minwidth'],
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
      scaleProperties: ['padding'],
      scales: ['small', 'medium', 'large'],
    },
    icon: {
      states: ['', 'hover', 'pressed', 'disabled', 'selected'],
      scales: ['small', 'medium', 'large'],
      scaleProperties: ['size'],
      variants: ['neutral', 'primary', 'outline', 'subtle'],
      variantStateProperties: ['foreground'],
    },
    text: {
      scales: ['small', 'medium', 'large'],
      scaleProperties: ['padding.horizontal', 'fontsize', 'lineheight', 'fontweight'],
    },
  },
};
