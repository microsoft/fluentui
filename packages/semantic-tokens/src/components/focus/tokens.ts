// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { backgroundCtrlBrandRestRaw } from '../../control/variables';
import { colorStrokeFocus2 } from '../../legacy/tokens';
import {
  ctrlFocusInnerStrokeWidthRaw,
  ctrlFocusInnerStrokeRaw,
  ctrlFocusOuterStrokeWidthRaw,
  ctrlFocusOuterStrokeRaw,
} from './variables';

export const ctrlFocusInnerStrokeWidth = `var(${ctrlFocusInnerStrokeWidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlFocusInnerStroke = `var(${ctrlFocusInnerStrokeRaw})`;
export const ctrlFocusOuterStrokeWidth = `var(${ctrlFocusOuterStrokeWidthRaw})`;
export const ctrlFocusOuterStroke = `var(${ctrlFocusOuterStrokeRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorStrokeFocus2}))`;
