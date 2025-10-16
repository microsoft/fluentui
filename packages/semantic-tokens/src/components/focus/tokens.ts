// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { strokeWidthDefaultRaw, backgroundCtrlBrandRestRaw } from '../../control/variables';
import { strokeWidthThin, colorStrokeFocus2, strokeWidthThick, colorTransparentStroke } from '../../legacy/tokens';
import {
  ctrlFocusInnerStrokeWidthRaw,
  ctrlFocusInnerStrokeRaw,
  ctrlFocusOuterStrokeWidthRaw,
  ctrlFocusOuterStrokeRaw,
} from './variables';

export const ctrlFocusInnerStrokeWidth = `var(${ctrlFocusInnerStrokeWidthRaw}, var(${strokeWidthDefaultRaw}, ${strokeWidthThin}))`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw}, ${colorStrokeFocus2})`;
export const ctrlFocusOuterStrokeWidth = `var(${ctrlFocusOuterStrokeWidthRaw}, ${strokeWidthThick})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorTransparentStroke}))`;
