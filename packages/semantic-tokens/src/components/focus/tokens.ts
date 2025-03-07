// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';
import { backgroundCtrlBrandRestRaw, strokewidthDefaultRaw } from '../../control/variables';
import {
  ctrlFocusInnerStrokeRaw,
  ctrlFocusInnerStrokewidthRaw,
  ctrlFocusOuterStrokeRaw,
  ctrlFocusOuterStrokewidthRaw,
  ctrlFocusPositionFigmaOnlyRaw,
} from './variables';
export const ctrlFocusPositionFigmaOnly = `var(${ctrlFocusPositionFigmaOnlyRaw})`;
export const ctrlFocusInnerStrokewidth = `var(${ctrlFocusInnerStrokewidthRaw}, ${strokewidthDefaultRaw})`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw})`;
export const ctrlFocusOuterStrokewidth = `var(${ctrlFocusOuterStrokewidthRaw})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${tokens.colorStrokeFocus2}))`;
