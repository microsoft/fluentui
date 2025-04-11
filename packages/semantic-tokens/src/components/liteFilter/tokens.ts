import {
  backgroundCtrlBrandRestRaw,
  foregroundCtrlOnbrandRestRaw,
  strokewidthDefaultRaw,
} from '../../control/variables';
import { strokeCtrlOnbrandRestRaw } from '../../nullable/variables';
import {
  ctrlLitefilterBackgroundSelectedRaw,
  ctrlLitefilterStrokeSelectedRaw,
  ctrlLitefilterForegroundSelectedRaw,
  ctrlLitefilterStrokewidthSelectedRaw,
} from './variables';

export const ctrlLitefilterBackgroundSelected = `var(${ctrlLitefilterBackgroundSelectedRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlLitefilterStrokeSelected = `var(${ctrlLitefilterStrokeSelectedRaw}, var(${strokeCtrlOnbrandRestRaw}))`;
export const ctrlLitefilterForegroundSelected = `var(${ctrlLitefilterForegroundSelectedRaw}, var(${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlLitefilterStrokewidthSelected = `var(${ctrlLitefilterStrokewidthSelectedRaw}, var(${strokewidthDefaultRaw}))`;
