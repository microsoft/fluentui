import { GroupPart } from '../groups.types';

// Link tokens
export const linkGroup: GroupPart = {
  components: ['link'],
  coreProperties: ['gap'],
  variants: ['brand', 'neutral'],
  states: ['', 'hover', 'pressed', 'disabled'],
  parts: {
    icon: {
      variants: ['brand', 'neutral'],
      states: ['', 'hover', 'pressed', 'disabled'],
      scales: ['small', 'medium', 'large'],
      scaleProperties: ['size'],
      variantStateProperties: ['foreground'],
    },
    text: {
      variants: ['brand', 'neutral'],
      coreProperties: ['fontfamily'],
      variantStateProperties: ['foreground'],
      scales: ['small', 'medium', 'large'],
      states: ['', 'hover', 'pressed', 'disabled'],
      scaleProperties: ['fontsize', 'lineheight', 'fontweight'],
      exceptions: [
        {
          // Onpage has full control over how to apply underline styles per state
          states: ['', 'hover', 'pressed', 'disabled'],
          variants: ['onpage'],
          variantStateProperties: ['decorationline'],
        },
      ],
    },
    'text.underline': {
      coreProperties: ['strokewidth', 'style'],
      variants: ['brand', 'neutral'],
      states: ['', 'hover', 'pressed', 'disabled'],
    },
  },
};
