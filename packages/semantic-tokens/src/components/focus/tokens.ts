import { backgroundCtrlBrandRestRaw, strokewidthDefaultRaw } from '../../control/variables';
import { colorStrokeFocus2 } from '../../legacy/tokens';
import {
  ctrlFocusInnerStrokeRaw,
  ctrlFocusInnerStrokewidthRaw,
  ctrlFocusOuterStrokeRaw,
  ctrlFocusOuterStrokewidthRaw,
  ctrlFocusPositionFigmaonlyRaw,
} from './variables';

export const ctrlFocusPositionFigmaonly = `var(${ctrlFocusPositionFigmaonlyRaw})`;
export const ctrlFocusInnerStrokewidth = `var(${ctrlFocusInnerStrokewidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw})`;
export const ctrlFocusOuterStrokewidth = `var(${ctrlFocusOuterStrokewidthRaw})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorStrokeFocus2}))`;
