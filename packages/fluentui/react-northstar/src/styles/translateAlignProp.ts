import { TextAlignProperty as RealTextAlignProperty } from 'csstype';
import { AlignValue } from '../utils';

/** Copy of TextAlignProperty from csstype (works around TS error) */
// This is probably removable if we turn off isolatedModules in the future (then we can just
// re-export TextAlignProperty).)
export type TextAlignProperty =
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | 'center'
  | 'end'
  | 'justify'
  | 'left'
  | 'match-parent'
  | 'right'
  | 'start';

export const translateAlignProp: (textAlignProp: AlignValue) => TextAlignProperty = textAlignProp => {
  // This assignment verifies that the copy of TextAlignProperty matches up with the real one.
  const alignProp: RealTextAlignProperty = textAlignProp;
  switch (alignProp) {
    case 'start':
      return 'left';
    case 'end':
      return 'right';
    default:
      return alignProp as TextAlignProperty;
  }
};
