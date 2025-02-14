import { tokens } from '@fluentui/react-theme';
import {
  foregroundCtrlBrandRest,
  foregroundCtrlBrandHover,
  foregroundCtrlBrandPressed,
  foregroundCtrlNeutralPrimaryHover,
  foregroundCtrlNeutralPrimaryPressed,
  foregroundCtrlNeutralPrimaryRest,
} from '../../control/variables';

// Brand colors (Used as default Link control colors in Fluent 2)
export const ctrlLinkForegroundBrandRestRaw = '--ctrl-link-foreground-brand-rest';
export const ctrlLinkForegroundBrandHoverRaw = '--ctrl-link-foreground-brand-hover';
export const ctrlLinkForegroundBrandPressedRaw = '--ctrl-link-foreground-brand-pressed';
export const ctrlLinkForegroundBrandRest = `var(${ctrlLinkForegroundBrandRestRaw}, var(${foregroundCtrlBrandRest},${tokens.colorBrandForegroundLink}))))`;
export const ctrlLinkForegroundBrandHover = `var(${ctrlLinkForegroundBrandHoverRaw}, var(${foregroundCtrlBrandHover},${tokens.colorBrandForegroundLinkHover}))))`;
export const ctrlLinkForegroundBrandPressed = `var(${ctrlLinkForegroundBrandPressedRaw}, var(${foregroundCtrlBrandPressed},${tokens.colorBrandForegroundLinkPressed}))))`;

// Neutral colors (for non-branded use aka fluent2 'subtle')
export const ctrlLinkForegroundNeutralRestRaw = '--ctrl-link-foreground-neutral-rest';
export const ctrlLinkForegroundNeutralHoverRaw = '--ctrl-link-foreground-neutral-hover';
export const ctrlLinkForegroundNeutralPressedRaw = '--ctrl-link-foreground-neutral-pressed';
// In the design specs, this falls back to colorNeutralForeground1, but in fluent2 it falls back to colorNeutralForeground2
export const ctrlLinkForegroundNeutralRest = `var(${ctrlLinkForegroundNeutralRestRaw}, var(${foregroundCtrlNeutralPrimaryRest},${tokens.colorNeutralForeground2}))))`;
export const ctrlLinkForegroundNeutralHover = `var(${ctrlLinkForegroundNeutralHoverRaw}, var(${foregroundCtrlNeutralPrimaryHover},${tokens.colorNeutralForeground2Hover}))))`;
export const ctrlLinkForegroundNeutralPressed = `var(${ctrlLinkForegroundNeutralPressedRaw}, var(${foregroundCtrlNeutralPrimaryPressed},${tokens.colorNeutralForeground2Pressed}))))`;
