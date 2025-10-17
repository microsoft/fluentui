// Make control tokens for compound button that cover:
// iconSize
// scale padding
// gap
// minWidth
// minHeight

import { GroupPart, Groups } from './groups';

const compoundButtonGroup: GroupPart = {
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

export const controls: Groups = {
  compoundbutton: compoundButtonGroup,
};
