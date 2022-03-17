import { Property } from 'csstype';

export const translateAlignProp: (alignProp: Property.TextAlign) => Property.TextAlign = alignProp => {
  switch (alignProp) {
    case 'start':
      return 'left';
    case 'end':
      return 'right';
    default:
      return alignProp;
  }
};
