import { GroupPart } from '../groups.types';

// Compound button control tokens
export const compoundButtonGroup: GroupPart = {
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
export const buttonGroup: GroupPart = {
  coreProperties: ['strokewidth'],
  variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
  variantProperties: [],
  variantStateProperties: ['background', 'stroke'],
  scales: ['small', 'medium', 'large'],
  scaleProperties: ['padding.horizontal', 'padding.top', 'padding.bottom', 'gap', 'minwidth', 'minheight'],
  scaleStateProperties: ['corner'],
  states: ['', 'hover', 'pressed', 'selected', 'hover.selected', 'pressed.selected', 'disabled'],
  components: ['button'],
  exceptions: [
    {
      // Outline buttons may modify strokeWidth based on state, as it is their main visual element
      variants: ['outline'],
      states: ['', 'hover', 'pressed', 'selected'],
      variantStateProperties: ['strokewidth'],
    },
    {
      // Shadow is only available on primary/neutral variant buttons
      states: ['', 'disabled', 'selected', 'disabled.selected'],
      variants: ['neutral', 'primary'],
      variantStateProperties: ['shadow'],
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
      variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
      variantStateProperties: ['foreground'],
    },
    divider: {
      coreProperties: ['strokewidth', 'margin.vertical'],
      variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
      variantProperties: ['stroke'],
    },
    chevron: {
      variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
      states: ['', 'hover', 'pressed', 'selected', 'disabled'],
      variantStateProperties: ['foreground'],
      scales: ['small', 'medium', 'large'],
      scaleProperties: ['size'],
    },
    text: {
      coreProperties: ['fontfamily'],
      scales: ['small', 'medium', 'large'],
      states: ['', 'hover', 'pressed', 'disabled', 'selected'],
      variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
      variantStateProperties: ['foreground'],
      scaleProperties: ['padding.horizontal', 'fontsize', 'lineheight', 'fontweight'],
      exceptions: [
        {
          scales: ['small', 'medium', 'large'],
          states: ['selected'],
          scaleStateProperties: ['fontweight'],
        },
      ],
    },
    'text.secondary': {
      scales: ['small', 'medium', 'large'],
      states: ['', 'hover', 'pressed', 'disabled'],
      variants: ['neutral', 'primary', 'outline', 'subtle', 'transparent'],
      variantStateProperties: ['foreground'],
      scaleProperties: ['fontsize', 'lineheight', 'fontweight'],
    },
  },
};
