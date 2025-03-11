import { nullNumberRaw, strokewidthDefaultRaw } from '../../control/variables';
import {
  ctrlSplitDividerStrokewidthOnoutlineRaw,
  ctrlSplitDividerStrokewidthOnsubtleRaw,
  ctrlSplitDividerStrokewidthRaw,
} from './variables';
export const ctrlSplitDividerStrokewidth = `var(${ctrlSplitDividerStrokewidthRaw}, ${strokewidthDefaultRaw})`;
export const ctrlSplitDividerStrokewidthOnoutline = `var(${ctrlSplitDividerStrokewidthOnoutlineRaw}, ${strokewidthDefaultRaw})`;
export const ctrlSplitDividerStrokewidthOnsubtle = `var(${ctrlSplitDividerStrokewidthOnsubtleRaw}, ${nullNumberRaw})`;
