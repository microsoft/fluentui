// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';

export const ctrlTooltipShadowKeyX = `var(${ctrlTooltipShadowKeyXRaw}, ${ctrlFabShadowRest(key)(x)Raw})`;
export const ctrlTooltipShadowKeyY = `var(${ctrlTooltipShadowKeyYRaw}, ${ctrlFabShadowRest(key)(y)Raw})`;
export const ctrlTooltipShadowKeyBlur = `var(${ctrlTooltipShadowKeyBlurRaw}, ${ctrlFabShadowRest(key)(blur)Raw})`;
export const ctrlTooltipShadowKeyColor = `var(${ctrlTooltipShadowKeyColorRaw}, ${ctrlFabShadowRest(key)(color)Raw})`;
export const ctrlTooltipShadowAmbientX = `var(${ctrlTooltipShadowAmbientXRaw}, ${ctrlFabShadowRest(ambient)(x)Raw})`;
export const ctrlTooltipShadowAmbientY = `var(${ctrlTooltipShadowAmbientYRaw}, ${ctrlFabShadowRest(ambient)(y)Raw})`;
export const ctrlTooltipShadowAmbientBlur = `var(${ctrlTooltipShadowAmbientBlurRaw}, ${ctrlFabShadowRest(ambient)(blur)Raw})`;
export const ctrlTooltipShadowAmbientColor = `var(${ctrlTooltipShadowAmbientColorRaw}, ${ctrlFabShadowRest(ambient)(color)Raw})`;
export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, var(${cornerCtrlRestRaw}, ${mediumRaw}))`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw}, ${tokens.colorNeutralBackground1})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw}, ${tokens.colorNeutralForeground1})`;
