import { strokewidthDefaultRaw } from '../../control/variables';
import {
  ctrlSplitDividerStrokewidthRaw,
  ctrlSplitDividerStrokewidthOnoutlineRaw,
  ctrlSplitDividerStrokewidthOnsubtleRaw,
} from './variables';

export const ctrlSplitDividerStrokewidth = `var(${ctrlSplitDividerStrokewidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlSplitDividerStrokewidthOnoutline = `var(${ctrlSplitDividerStrokewidthOnoutlineRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlSplitDividerStrokewidthOnsubtle = `var(${ctrlSplitDividerStrokewidthOnsubtleRaw}, unset)`;
