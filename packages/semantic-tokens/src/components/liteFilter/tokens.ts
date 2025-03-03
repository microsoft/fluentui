// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';

export const ctrlLitefilterBackgroundSelected = `var(${ctrlLitefilterBackgroundSelectedRaw}, var(${backgroundCtrlBrandRestRaw}, ${brandBackground1RestRaw}))`;
export const ctrlLitefilterStrokeSelected = `var(${ctrlLitefilterStrokeSelectedRaw}, var(${strokeCtrlOnbrandRestRaw}, ${nullColorRaw}))`;
export const ctrlLitefilterForegroundSelected = `var(${ctrlLitefilterForegroundSelectedRaw}, var(${foregroundCtrlOnbrandRestRaw}, ${tokens.colorNeutralForegroundOn Brand}))`;
export const ctrlLitefilterStrokewidthSelected = `var(${ctrlLitefilterStrokewidthSelectedRaw}, var(${strokewidthDefaultRaw}, ${tokens.strokeWidthThin}))`;
