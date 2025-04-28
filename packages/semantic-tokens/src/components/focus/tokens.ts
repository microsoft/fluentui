// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { strokewidthDefaultRaw, backgroundCtrlBrandRestRaw } from '../../control/variables';
import { strokeWidthThin, colorStrokeFocus2, strokeWidthThick, colorTransparentStroke } from '../../legacy/tokens';
import {
  ctrlFocusPositionFigmaonlyRaw,
  ctrlFocusInnerStrokewidthRaw,
  ctrlFocusInnerStrokeRaw,
  ctrlFocusOuterStrokewidthRaw,
  ctrlFocusOuterStrokeRaw,
} from './variables';

export const ctrlFocusPositionFigmaonly = `var(${ctrlFocusPositionFigmaonlyRaw})`;
export const ctrlFocusInnerStrokewidth = `var(${ctrlFocusInnerStrokewidthRaw}, var(${strokewidthDefaultRaw}, ${strokeWidthThin}))`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw}, ${colorStrokeFocus2})`;
export const ctrlFocusOuterStrokewidth = `var(${ctrlFocusOuterStrokewidthRaw}, ${strokeWidthThick})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorTransparentStroke}))`;
