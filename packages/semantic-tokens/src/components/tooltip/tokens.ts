import { cornerCtrlRestRaw } from '../../control/variables';
import {
  ctrlFabShadowRestAmbientBlurRaw,
  ctrlFabShadowRestAmbientColorRaw,
  ctrlFabShadowRestAmbientXRaw,
  ctrlFabShadowRestAmbientYRaw,
  ctrlFabShadowRestKeyBlurRaw,
  ctrlFabShadowRestKeyColorRaw,
  ctrlFabShadowRestKeyXRaw,
  ctrlFabShadowRestKeyYRaw,
} from '../fab/variables';
import {
  ctrlTooltipBackgroundRaw,
  ctrlTooltipCornerRaw,
  ctrlTooltipForegroundRaw,
  ctrlTooltipShadowAmbientBlurRaw,
  ctrlTooltipShadowAmbientColorRaw,
  ctrlTooltipShadowAmbientXRaw,
  ctrlTooltipShadowAmbientYRaw,
  ctrlTooltipShadowKeyBlurRaw,
  ctrlTooltipShadowKeyColorRaw,
  ctrlTooltipShadowKeyXRaw,
  ctrlTooltipShadowKeyYRaw,
} from './variables';
export const ctrlTooltipShadowKeyX = `var(${ctrlTooltipShadowKeyXRaw}, var(${ctrlFabShadowRestKeyXRaw}))`;
export const ctrlTooltipShadowKeyY = `var(${ctrlTooltipShadowKeyYRaw}, var(${ctrlFabShadowRestKeyYRaw}))`;
export const ctrlTooltipShadowKeyBlur = `var(${ctrlTooltipShadowKeyBlurRaw}, var(${ctrlFabShadowRestKeyBlurRaw}))`;
export const ctrlTooltipShadowKeyColor = `var(${ctrlTooltipShadowKeyColorRaw}, var(${ctrlFabShadowRestKeyColorRaw}))`;
export const ctrlTooltipShadowAmbientX = `var(${ctrlTooltipShadowAmbientXRaw}, var(${ctrlFabShadowRestAmbientXRaw}))`;
export const ctrlTooltipShadowAmbientY = `var(${ctrlTooltipShadowAmbientYRaw}, var(${ctrlFabShadowRestAmbientYRaw}))`;
export const ctrlTooltipShadowAmbientBlur = `var(${ctrlTooltipShadowAmbientBlurRaw}, var(${ctrlFabShadowRestAmbientBlurRaw}))`;
export const ctrlTooltipShadowAmbientColor = `var(${ctrlTooltipShadowAmbientColorRaw}, var(${ctrlFabShadowRestAmbientColorRaw}))`;
export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw})`;
