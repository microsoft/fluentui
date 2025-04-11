// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { cornerCtrlRestRaw } from '../../control/variables';
import { ctrlFabShadowRestKeyRaw, ctrlFabShadowRestAmbientRaw } from '../fab/variables';
import {
  ctrlTooltipCornerRaw,
  ctrlTooltipBackgroundRaw,
  ctrlTooltipForegroundRaw,
  ctrlTooltipShadowKeyRaw,
  ctrlTooltipShadowAmbientRaw,
} from './variables';

export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw})`;
export const ctrlTooltipShadowKey = `var(${ctrlTooltipShadowKeyRaw}, var(${ctrlFabShadowRestKeyRaw}))`;
export const ctrlTooltipShadowAmbient = `var(${ctrlTooltipShadowAmbientRaw}, var(${ctrlFabShadowRestAmbientRaw}))`;
