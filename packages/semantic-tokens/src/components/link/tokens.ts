import {
  foregroundCtrlBrandHoverRaw,
  foregroundCtrlBrandPressedRaw,
  foregroundCtrlBrandRestRaw,
  foregroundCtrlNeutralPrimaryRestRaw,
  strokewidthDefaultRaw,
} from '../../control/variables';
import {
  colorBrandForegroundLink,
  colorBrandForegroundLinkHover,
  colorBrandForegroundLinkPressed,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
} from '../../legacy/tokens';
import {
  ctrlLinkForegroundBrandHoverRaw,
  ctrlLinkForegroundBrandPressedRaw,
  ctrlLinkForegroundBrandRestRaw,
  ctrlLinkForegroundNeutralHoverRaw,
  ctrlLinkForegroundNeutralPressedRaw,
  ctrlLinkForegroundNeutralRestRaw,
  ctrlLinkInlineShowunderlineatrestRaw,
  ctrlLinkInlineStrokewidthHoverRaw,
  ctrlLinkInlineStrokewidthRestRaw,
  ctrlLinkInlineUnderlineDashedRaw,
  ctrlLinkInlineUnderlineSolidFigmaonlyRaw,
  ctrlLinkOnpageShowunderlineatrestRaw,
  ctrlLinkOnpageStrokewidthHoverRaw,
  ctrlLinkOnpageStrokewidthRestRaw,
  ctrlLinkOnpageUnderlineDashedRaw,
  ctrlLinkOnpageUnderlineSolidFigmaonlyRaw,
} from './variables';

export const ctrlLinkForegroundNeutralRest = `var(${ctrlLinkForegroundNeutralRestRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, ${colorNeutralForeground2}))`;
export const ctrlLinkInlineStrokewidthRest = `var(${ctrlLinkInlineStrokewidthRestRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkInlineStrokewidthHover = `var(${ctrlLinkInlineStrokewidthHoverRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkInlineUnderlineDashed = `var(${ctrlLinkInlineUnderlineDashedRaw})`;
export const ctrlLinkInlineUnderlineSolidFigmaonly = `var(${ctrlLinkInlineUnderlineSolidFigmaonlyRaw})`;
export const ctrlLinkForegroundNeutralHover = `var(${ctrlLinkForegroundNeutralHoverRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, ${colorNeutralForeground2Hover}))`;
export const ctrlLinkForegroundNeutralPressed = `var(${ctrlLinkForegroundNeutralPressedRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, ${colorNeutralForeground2Pressed}))`;
export const ctrlLinkForegroundBrandRest = `var(${ctrlLinkForegroundBrandRestRaw}, var(${foregroundCtrlBrandRestRaw}, ${colorBrandForegroundLink}))`;
export const ctrlLinkForegroundBrandHover = `var(${ctrlLinkForegroundBrandHoverRaw}, var(${foregroundCtrlBrandHoverRaw}, ${colorBrandForegroundLinkHover}))`;
export const ctrlLinkForegroundBrandPressed = `var(${ctrlLinkForegroundBrandPressedRaw}, var(${foregroundCtrlBrandPressedRaw}, ${colorBrandForegroundLinkPressed}))`;
export const ctrlLinkOnpageStrokewidthRest = `var(${ctrlLinkOnpageStrokewidthRestRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkOnpageStrokewidthHover = `var(${ctrlLinkOnpageStrokewidthHoverRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlLinkOnpageUnderlineDashed = `var(${ctrlLinkOnpageUnderlineDashedRaw})`;
export const ctrlLinkOnpageUnderlineSolidFigmaonly = `var(${ctrlLinkOnpageUnderlineSolidFigmaonlyRaw})`;
export const ctrlLinkInlineShowunderlineatrest = `var(${ctrlLinkInlineShowunderlineatrestRaw})`;
export const ctrlLinkOnpageShowunderlineatrest = `var(${ctrlLinkOnpageShowunderlineatrestRaw})`;
