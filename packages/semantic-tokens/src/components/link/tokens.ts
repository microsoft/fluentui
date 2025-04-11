import { tokens } from '@fluentui/tokens';
import {
  foregroundCtrlNeutralPrimaryRestRaw,
  strokewidthDefaultRaw,
  foregroundCtrlBrandRestRaw,
  foregroundCtrlBrandHoverRaw,
  foregroundCtrlBrandPressedRaw,
} from '../../control/variables';
import {
  ctrlLinkForegroundNeutralRestRaw,
  ctrlLinkInlineStrokewidthRestRaw,
  ctrlLinkInlineStrokewidthHoverRaw,
  ctrlLinkInlineUnderlineDashedRaw,
  ctrlLinkInlineUnderlineSolidFigmaonlyRaw,
  ctrlLinkForegroundNeutralHoverRaw,
  ctrlLinkForegroundNeutralPressedRaw,
  ctrlLinkForegroundBrandRestRaw,
  ctrlLinkForegroundBrandHoverRaw,
  ctrlLinkForegroundBrandPressedRaw,
  ctrlLinkOnpageStrokewidthRestRaw,
  ctrlLinkOnpageStrokewidthHoverRaw,
  ctrlLinkOnpageUnderlineDashedRaw,
  ctrlLinkOnpageUnderlineSolidFigmaonlyRaw,
  ctrlLinkInlineShowunderlineatrestRaw,
  ctrlLinkOnpageShowunderlineatrestRaw,
} from './variables';
export const ctrlLinkForegroundNeutralRest = `var(${ctrlLinkForegroundNeutralRestRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, ${tokens.colorNeutralForeground2}))`;
export const ctrlLinkInlineStrokewidthRest = `var(${ctrlLinkInlineStrokewidthRestRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkInlineStrokewidthHover = `var(${ctrlLinkInlineStrokewidthHoverRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkInlineUnderlineDashed = `var(${ctrlLinkInlineUnderlineDashedRaw})`;
export const ctrlLinkInlineUnderlineSolidFigmaonly = `var(${ctrlLinkInlineUnderlineSolidFigmaonlyRaw})`;
export const ctrlLinkForegroundNeutralHover = `var(${ctrlLinkForegroundNeutralHoverRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, ${tokens.colorNeutralForeground2Hover}))`;
export const ctrlLinkForegroundNeutralPressed = `var(${ctrlLinkForegroundNeutralPressedRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, ${tokens.colorNeutralForeground2Pressed}))`;
export const ctrlLinkForegroundBrandRest = `var(${ctrlLinkForegroundBrandRestRaw}, var(${foregroundCtrlBrandRestRaw}, ${tokens.colorBrandForegroundLink}))`;
export const ctrlLinkForegroundBrandHover = `var(${ctrlLinkForegroundBrandHoverRaw}, var(${foregroundCtrlBrandHoverRaw}, ${tokens.colorBrandForegroundLinkHover}))`;
export const ctrlLinkForegroundBrandPressed = `var(${ctrlLinkForegroundBrandPressedRaw}, var(${foregroundCtrlBrandPressedRaw}, ${tokens.colorBrandForegroundLinkPressed}))`;
export const ctrlLinkOnpageStrokewidthRest = `var(${ctrlLinkOnpageStrokewidthRestRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkOnpageStrokewidthHover = `var(${ctrlLinkOnpageStrokewidthHoverRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkOnpageUnderlineDashed = `var(${ctrlLinkOnpageUnderlineDashedRaw})`;
export const ctrlLinkOnpageUnderlineSolidFigmaonly = `var(${ctrlLinkOnpageUnderlineSolidFigmaonlyRaw})`;
export const ctrlLinkInlineShowunderlineatrest = `var(${ctrlLinkInlineShowunderlineatrestRaw})`;
export const ctrlLinkOnpageShowunderlineatrest = `var(${ctrlLinkOnpageShowunderlineatrestRaw})`;
