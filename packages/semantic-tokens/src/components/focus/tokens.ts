// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { strokewidthDefaultRaw, backgroundCtrlBrandRestRaw } from '../../control/variables';
import { colorStrokeFocus2, strokeWidthThick } from '../../legacy/tokens';
import {
  ctrlFocusPositionFigmaonlyRaw,
  ctrlFocusInnerStrokewidthRaw,
  ctrlFocusInnerStrokeRaw,
  ctrlFocusOuterStrokewidthRaw,
  ctrlFocusOuterStrokeRaw,
} from './variables';

export const ctrlFocusPositionFigmaonly = `var(${ctrlFocusPositionFigmaonlyRaw})`;
export const ctrlFocusInnerStrokewidth = `var(${ctrlFocusInnerStrokewidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw}, ${colorStrokeFocus2})`;
export const ctrlFocusOuterStrokewidth = `var(${ctrlFocusOuterStrokewidthRaw}, ${strokeWidthThick})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorStrokeFocus2}))`;
