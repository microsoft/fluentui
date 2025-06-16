// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { cornerCtrlRestRaw } from '../../control/variables';
import { ctrlFabShadowRestRaw } from '../fab/variables';
import {
  ctrlTooltipCornerRaw,
  ctrlTooltipBackgroundRaw,
  ctrlTooltipForegroundRaw,
  ctrlTooltipShadowRaw,
} from './variables';

export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw})`;
export const ctrlTooltipShadow = `var(${ctrlTooltipShadowRaw}, var(${ctrlFabShadowRestRaw}))`;
