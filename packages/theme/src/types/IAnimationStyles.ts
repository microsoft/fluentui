/* eslint-disable @typescript-eslint/naming-convention */
import type { IRawStyle } from '@fluentui/merge-styles';

/**
 * All Fabric standard animations, exposed as json objects referencing predefined
 * keyframes. These objects can be mixed in with other class definitions.
 * {@docCategory IAnimationStyles}
 */
export interface IAnimationStyles {
  slideRightIn10: IRawStyle;
  slideRightIn20: IRawStyle;
  slideRightIn40: IRawStyle;
  slideRightIn400: IRawStyle;
  slideLeftIn10: IRawStyle;
  slideLeftIn20: IRawStyle;
  slideLeftIn40: IRawStyle;
  slideLeftIn400: IRawStyle;
  slideUpIn10: IRawStyle;
  slideUpIn20: IRawStyle;
  slideDownIn10: IRawStyle;
  slideDownIn20: IRawStyle;
  slideRightOut10: IRawStyle;
  slideRightOut20: IRawStyle;
  slideRightOut40: IRawStyle;
  slideRightOut400: IRawStyle;
  slideLeftOut10: IRawStyle;
  slideLeftOut20: IRawStyle;
  slideLeftOut40: IRawStyle;
  slideLeftOut400: IRawStyle;
  slideUpOut10: IRawStyle;
  slideUpOut20: IRawStyle;
  slideDownOut10: IRawStyle;
  slideDownOut20: IRawStyle;
  scaleUpIn100: IRawStyle;
  scaleDownIn100: IRawStyle;
  scaleUpOut103: IRawStyle;
  scaleDownOut98: IRawStyle;
  fadeIn100: IRawStyle;
  fadeIn200: IRawStyle;
  fadeIn400: IRawStyle;
  fadeIn500: IRawStyle;
  fadeOut100: IRawStyle;
  fadeOut200: IRawStyle;
  fadeOut400: IRawStyle;
  fadeOut500: IRawStyle;
  rotate90deg: IRawStyle;
  rotateN90deg: IRawStyle;
}

export interface IAnimationVariables {
  easeFunction1: string;
  easeFunction2: string;
  durationValue1: string;
  durationValue2: string;
  durationValue3: string;
  durationValue4: string;
}
