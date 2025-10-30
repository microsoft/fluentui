import { GroupPart } from '../../definitions/groups.types';

// Fluent compound button control tokens
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
