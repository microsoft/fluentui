import {
  backgroundCtrlBrandRestRaw,
  foregroundCtrlOnbrandRestRaw,
  nullColorRaw,
  strokewidthDefaultRaw,
} from '../../control/variables';
import { strokeCtrlOnbrandRestRaw } from '../../nullable/variables';
import {
  ctrlLitefilterBackgroundSelectedRaw,
  ctrlLitefilterForegroundSelectedRaw,
  ctrlLitefilterStrokeSelectedRaw,
  ctrlLitefilterStrokewidthSelectedRaw,
} from './variables';

export const ctrlLitefilterBackgroundSelected = `var(${ctrlLitefilterBackgroundSelectedRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlLitefilterStrokeSelected = `var(${ctrlLitefilterStrokeSelectedRaw}, var(${strokeCtrlOnbrandRestRaw}, ${nullColorRaw}))`;
export const ctrlLitefilterForegroundSelected = `var(${ctrlLitefilterForegroundSelectedRaw}, ${foregroundCtrlOnbrandRestRaw})`;
export const ctrlLitefilterStrokewidthSelected = `var(${ctrlLitefilterStrokewidthSelectedRaw}, ${strokewidthDefaultRaw})`;
