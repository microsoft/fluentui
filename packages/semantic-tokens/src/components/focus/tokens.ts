// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';
import { backgroundCtrlBrandRestRaw, strokewidthDefaultRaw } from '../../control/variables';
import {
  ctrlFocusInnerStrokeRaw,
  ctrlFocusInnerStrokewidthRaw,
  ctrlFocusOuterStrokeRaw,
  ctrlFocusOuterStrokewidthRaw,
  ctrlFocusPositionFigmaonlyRaw,
} from './variables';
export const ctrlFocusPositionFigmaonly = `var(${ctrlFocusPositionFigmaonlyRaw})`;
export const ctrlFocusInnerStrokewidth = `var(${ctrlFocusInnerStrokewidthRaw}, ${strokewidthDefaultRaw})`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw})`;
export const ctrlFocusOuterStrokewidth = `var(${ctrlFocusOuterStrokewidthRaw})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${tokens.colorStrokeFocus2}))`;
