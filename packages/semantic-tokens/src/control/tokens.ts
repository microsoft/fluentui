/*
 * Control level tokens are generic tokens that can be used across multiple components.
 *
 * Components with a different fluent 2 fallback than the control should define a component specific token instead.
 */

import { tokens } from '@fluentui/tokens';

// Text
export const textStyleDefaultRegularFontfamily = `var(--text-style-default-regular-fontfamily, ${tokens.fontFamilyBase})`;
export const textGlobalBody3Fontsize = `var(--text-global-body3-fontsize, ${tokens.fontSizeBase300})`;
export const textStyleDefaultRegularWeight = `var(--text-style-default-regular-weight, ${tokens.fontWeightRegular})`;

// Stroke
export const strokewidthDefault = `var(--strokewidth-default, ${tokens.strokeWidthThin})`;
export const ctrlFocusOuterStroke = `var(--ctrl-focus-outer-stroke, ${tokens.colorStrokeFocus2})`;

// Disabled
export const foregroundCtrlOntransparentDisabled = `var(--foreground-ctrl-ontransparent-disabled, ${tokens.colorNeutralForegroundDisabled})`;
export const foregroundCtrlNeutralPrimaryDisabled = `var(--foreground-ctrl-neutral-primary-disabled, ${tokens.colorNeutralForegroundDisabled})`;
