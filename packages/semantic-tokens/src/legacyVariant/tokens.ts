// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { gapInsideCtrlDefaultRaw } from '../control/variables';
import { spacingHorizontalSNudge, colorTransparentStrokeInteractive, colorTransparentStroke } from '../legacy/tokens';
import { strokeCtrlOnBrandHoverRaw, strokeCtrlOnBrandRestRaw } from '../nullable/variables';
import { strokeCtrlOnActiveBrandHoverRaw, strokeCtrlOnActiveBrandRestRaw } from '../optional/variables';

/**
 * This is a legacy variant for gapInsideCtrlDefault to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use gapInsideCtrlDefault instead.
 */
export const _ctrlButtonGapInsideDefault = `var(${gapInsideCtrlDefaultRaw}, ${spacingHorizontalSNudge})`;
/**
 * This is a legacy variant for strokeCtrlOnActiveBrandHover to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use strokeCtrlOnActiveBrandHover instead.
 */
export const _ctrlSwitchStrokeOnActiveBrandHover = `var(${strokeCtrlOnActiveBrandHoverRaw}, var(${strokeCtrlOnBrandHoverRaw}, ${colorTransparentStrokeInteractive}))`;
/**
 * This is a legacy variant for strokeCtrlOnActiveBrandRest to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use strokeCtrlOnActiveBrandRest instead.
 */
export const _ctrlSwitchStrokeOnActiveBrandRest = `var(${strokeCtrlOnActiveBrandRestRaw}, var(${strokeCtrlOnBrandRestRaw}, ${colorTransparentStroke}))`;
