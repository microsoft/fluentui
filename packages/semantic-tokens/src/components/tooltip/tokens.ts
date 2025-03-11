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
export const ctrlTooltipShadowKeyX = `var(${ctrlTooltipShadowKeyXRaw}, ${ctrlFabShadowRestKeyXRaw})`;
export const ctrlTooltipShadowKeyY = `var(${ctrlTooltipShadowKeyYRaw}, ${ctrlFabShadowRestKeyYRaw})`;
export const ctrlTooltipShadowKeyBlur = `var(${ctrlTooltipShadowKeyBlurRaw}, ${ctrlFabShadowRestKeyBlurRaw})`;
export const ctrlTooltipShadowKeyColor = `var(${ctrlTooltipShadowKeyColorRaw}, ${ctrlFabShadowRestKeyColorRaw})`;
export const ctrlTooltipShadowAmbientX = `var(${ctrlTooltipShadowAmbientXRaw}, ${ctrlFabShadowRestAmbientXRaw})`;
export const ctrlTooltipShadowAmbientY = `var(${ctrlTooltipShadowAmbientYRaw}, ${ctrlFabShadowRestAmbientYRaw})`;
export const ctrlTooltipShadowAmbientBlur = `var(${ctrlTooltipShadowAmbientBlurRaw}, ${ctrlFabShadowRestAmbientBlurRaw})`;
export const ctrlTooltipShadowAmbientColor = `var(${ctrlTooltipShadowAmbientColorRaw}, ${ctrlFabShadowRestAmbientColorRaw})`;
export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, ${cornerCtrlRestRaw})`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw})`;
