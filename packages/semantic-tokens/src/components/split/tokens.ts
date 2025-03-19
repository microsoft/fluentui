import { strokewidthDefaultRaw } from '../../control/variables';
import {
  ctrlSplitDividerStrokewidthOnoutlineRaw,
  ctrlSplitDividerStrokewidthOnsubtleRaw,
  ctrlSplitDividerStrokewidthRaw,
} from './variables';
export const ctrlSplitDividerStrokewidth = `var(${ctrlSplitDividerStrokewidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlSplitDividerStrokewidthOnoutline = `var(${ctrlSplitDividerStrokewidthOnoutlineRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlSplitDividerStrokewidthOnsubtle = `var(${ctrlSplitDividerStrokewidthOnsubtleRaw}, unset)`;
