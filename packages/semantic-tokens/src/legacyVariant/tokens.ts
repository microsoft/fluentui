// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { gapInsideCtrlDefaultRaw, foregroundCtrlNeutralPrimaryRestRaw } from '../control/variables';
import { spacingHorizontalSNudge } from '../legacy/tokens';
import {
  foregroundCtrlOnTransparentRestRaw,
  foregroundCtrlOnTransparentHoverRaw,
  foregroundCtrlOnTransparentPressedRaw,
} from '../optional/variables';

/**
 * This is a legacy variant for gapInsideCtrlDefault to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use gapInsideCtrlDefault instead.
 */
export const _ctrlButtonGapInsideDefault = `var(${gapInsideCtrlDefaultRaw}, ${spacingHorizontalSNudge})`;
/**
 * This is a legacy variant for foregroundCtrlOnTransparentRest to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use foregroundCtrlOnTransparentRest instead.
 */
export const _ctrlAccordionForegroundRest = `var(${foregroundCtrlOnTransparentRestRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, red))`;
/**
 * This is a legacy variant for foregroundCtrlOnTransparentHover to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use foregroundCtrlOnTransparentHover instead.
 */
export const _ctrlAccordionForegroundHover = `var(${foregroundCtrlOnTransparentHoverRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, blue))`;
/**
 * This is a legacy variant for foregroundCtrlOnTransparentPressed to enable backwards compatibility.
 * It's purpose is to support Fluent UI legacy fallback variants only.
 * This token is not intended for use in new semantic theme implementations
 * please use foregroundCtrlOnTransparentPressed instead.
 */
export const _ctrlAccordionForegroundPressed = `var(${foregroundCtrlOnTransparentPressedRaw}, var(${foregroundCtrlNeutralPrimaryRestRaw}, green))`;
