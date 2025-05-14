// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import {
  backgroundCtrlBrandRestRaw,
  foregroundCtrlOnBrandRestRaw,
  strokeWidthDefaultRaw,
} from '../../control/variables';
import { strokeCtrlOnBrandRestRaw } from '../../nullable/variables';
import {
  ctrlLiteFilterBackgroundSelectedRaw,
  ctrlLiteFilterStrokeSelectedRaw,
  ctrlLiteFilterForegroundSelectedRaw,
  ctrlLiteFilterStrokeWidthSelectedRaw,
} from './variables';

export const ctrlLiteFilterBackgroundSelected = `var(${ctrlLiteFilterBackgroundSelectedRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlLiteFilterStrokeSelected = `var(${ctrlLiteFilterStrokeSelectedRaw}, var(${strokeCtrlOnBrandRestRaw}))`;
export const ctrlLiteFilterForegroundSelected = `var(${ctrlLiteFilterForegroundSelectedRaw}, var(${foregroundCtrlOnBrandRestRaw}))`;
export const ctrlLiteFilterStrokeWidthSelected = `var(${ctrlLiteFilterStrokeWidthSelectedRaw}, var(${strokeWidthDefaultRaw}))`;
