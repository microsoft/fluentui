import { cornerCtrlRestRaw } from '../../control/variables';
import { ctrlFabShadowRestAmbientRaw, ctrlFabShadowRestKeyRaw } from '../fab/variables';
import {
  ctrlTooltipBackgroundRaw,
  ctrlTooltipCornerRaw,
  ctrlTooltipForegroundRaw,
  ctrlTooltipShadowAmbientRaw,
  ctrlTooltipShadowKeyRaw,
} from './variables';

export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw})`;
export const ctrlTooltipShadowKey = `var(${ctrlTooltipShadowKeyRaw}, var(${ctrlFabShadowRestKeyRaw}))`;
export const ctrlTooltipShadowAmbient = `var(${ctrlTooltipShadowAmbientRaw}, var(${ctrlFabShadowRestAmbientRaw}))`;
