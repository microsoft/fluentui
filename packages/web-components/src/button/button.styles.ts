import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusLarge, // unaccounted for -- no large state in figma
  borderRadiusMedium, // unaccounted for -- no default (structure?)
  borderRadiusSmall, // unaccounted for -- no small state in figma
  curveEasyEase,
  durationFaster,
  fontSizeBase200, // unaccounted for -- no small state in figma
  fontSizeBase300, // unaccounted for -- no default
  fontSizeBase400, // unaccounted for -- no large state in figma
  fontWeightRegular, // unaccounted for -- no small state in figma
  lineHeightBase200, // unaccounted for -- no small state in figma
  lineHeightBase400, // unaccounted for -- no large state in figma
  shadow2, // unaccounted for - 0 0 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)
  shadow4, // unaccounted for - 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.14)
  spacingHorizontalL, // unaccounted for -- no large state in figma
  spacingHorizontalS, // unaccounted for -- no large state in figma
} from '../theme/design-tokens.js';
import {
  circularState,
  iconOnlyState,
  largeState,
  outlineState,
  primaryState,
  smallState,
  squareState,
  subtleState,
  transparentState,
} from '../styles/states/index.js';
import {
  ctrlButtonBrandBackgroundHover,
  ctrlButtonBrandBackgroundPressed,
  ctrlButtonBrandBackgroundRest,
  ctrlButtonBrandForegroundColorHover,
  ctrlButtonBrandForegroundColorRest,
  ctrlButtonBrandStrokeColorSelectedRest,
  ctrlButtonCircularCorner,
  ctrlButtonDefaultBackgroundDisabled,
  ctrlButtonDefaultBackgroundHover,
  ctrlButtonDefaultBackgroundPressed,
  ctrlButtonDefaultBackgroundRest,
  ctrlButtonDefaultForegroundColorDisabled,
  ctrlButtonDefaultForegroundColorHover,
  ctrlButtonDefaultForegroundColorPressed,
  ctrlButtonDefaultForegroundColorRest,
  ctrlButtonDefaultForegroundTextWeight,
  ctrlButtonDefaultStrokeColorDisabled,
  ctrlButtonDefaultStrokeColorHover,
  ctrlButtonDefaultStrokeColorPressed,
  ctrlButtonDefaultStrokeColorRest,
  ctrlButtonDefaultStrokeColorSelectedRest,
  ctrlButtonOutlineBackgroundHover,
  ctrlButtonOutlineBackgroundRest,
  ctrlButtonSubtleBackgroundHover,
  ctrlButtonSubtleBackgroundPressed,
  ctrlButtonSubtleBackgroundRest,
  ctrlButtonSubtleForegroundColorHover,
  ctrlButtonSubtleForegroundColorPressed,
  ctrlButtonTransparentBackgroundHover,
  ctrlButtonTransparentBackgroundPressed,
  ctrlButtonTransparentBackgroundRest,
  ctrlButtonTransparentForegroundColorHover,
  ctrlButtonTransparentForegroundColorPressed,
  ctrlButtonTransparentForegroundColorRest,
  ctrlButtonZeroCorner,
  ctrlDefaultFocusOuterStrokeColor,
  ctrlDefaultFocusOuterStrokeWidth,
  ctrlDefaultPaddingHorizontalDefault,
  ctrlDefaultPaddingIconOnly,
  ctrlDefaultPaddingToNestedControl,
  ctrlDefaultStrokeWidth,
  ctrlDefaultTextDefaultFamily,
  ctrlDefaultTextDefaultLineHeight,
} from './design-tokens.js';

/**
 * @internal
 */
export const baseButtonStyles = css`
  ${display('inline-flex')}

  :host {
    --icon-spacing: ${ctrlDefaultPaddingIconOnly};
    position: relative;
    contain: layout style;
    vertical-align: middle;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-align: center;
    text-decoration-line: none;
    margin: 0;
    min-height: 32px;
    outline-style: none;
    background-color: ${ctrlButtonDefaultBackgroundRest};
    color: ${ctrlButtonDefaultForegroundColorRest};
    border: ${ctrlDefaultStrokeWidth} solid ${ctrlButtonDefaultStrokeColorRest};
    padding: 0 ${ctrlDefaultPaddingHorizontalDefault};
    min-width: 96px;
    border-radius: ${borderRadiusMedium};
    font-size: ${fontSizeBase300};
    font-family: ${ctrlDefaultTextDefaultFamily};
    font-weight: ${ctrlButtonDefaultForegroundTextWeight};
    line-height: ${ctrlDefaultTextDefaultLineHeight};
    transition-duration: ${durationFaster};
    transition-property: background, border, color;
    transition-timing-function: ${curveEasyEase};
    cursor: pointer;
    user-select: none;
  }

  .content {
    display: inherit;
  }

  :host(:hover) {
    background-color: ${ctrlButtonDefaultBackgroundHover};
    color: ${ctrlButtonDefaultForegroundColorHover};
    border-color: ${ctrlButtonDefaultStrokeColorHover};
  }

  :host(:hover:active) {
    background-color: ${ctrlButtonDefaultBackgroundPressed};
    border-color: ${ctrlButtonDefaultStrokeColorPressed};
    color: ${ctrlButtonDefaultForegroundColorPressed};
    outline-style: none;
  }

  :host(:focus-visible) {
    border-color: ${ctrlButtonDefaultStrokeColorSelectedRest};
    outline: ${ctrlDefaultFocusOuterStrokeWidth} solid ${ctrlButtonDefaultStrokeColorSelectedRest};
    box-shadow: ${shadow4}, 0 0 0 2px ${ctrlDefaultFocusOuterStrokeColor};
  }

  @media screen and (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }

  ::slotted(svg) {
    font-size: 20px;
    height: 20px;
    width: 20px;
    fill: currentColor;
  }

  :is([slot='start'], ::slotted([slot='start'])) {
    margin-inline-end: var(--icon-spacing);
  }

  :is([slot='end'], ::slotted([slot='end'])) {
    margin-inline-start: var(--icon-spacing);
  }

  :host(${iconOnlyState}) {
    min-width: 32px;
    max-width: 32px;
  }

  :host(${smallState}) {
    --icon-spacing: ${ctrlDefaultPaddingToNestedControl};
    min-height: 24px;
    min-width: 64px;
    padding: 0 ${spacingHorizontalS};
    border-radius: ${borderRadiusSmall};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    font-weight: ${fontWeightRegular};
  }

  :host(${smallState}${iconOnlyState}) {
    min-width: 24px;
    max-width: 24px;
  }

  :host(${largeState}) {
    min-height: 40px;
    border-radius: ${borderRadiusLarge};
    padding: 0 ${spacingHorizontalL};
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host(${largeState}${iconOnlyState}) {
    min-width: 40px;
    max-width: 40px;
  }

  :host(${largeState}) ::slotted(svg) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host(:is(${circularState}, ${circularState}:focus-visible)) {
    border-radius: ${ctrlButtonCircularCorner};
  }

  :host(:is(${squareState}, ${squareState}:focus-visible)) {
    border-radius: ${ctrlButtonZeroCorner};
  }

  :host(${primaryState}) {
    background-color: ${ctrlButtonBrandBackgroundRest};
    color: ${ctrlButtonBrandForegroundColorRest};
    border-color: transparent;
  }

  :host(${primaryState}:hover) {
    background-color: ${ctrlButtonBrandBackgroundHover};
  }

  :host(${primaryState}:is(:hover, :hover:active)) {
    border-color: transparent;
    color: ${ctrlButtonBrandForegroundColorHover};
  }

  :host(${primaryState}:hover:active) {
    background-color: ${ctrlButtonBrandBackgroundPressed};
  }

  :host(${primaryState}:focus-visible) {
    border-color: ${ctrlButtonBrandStrokeColorSelectedRest};
    box-shadow: ${shadow2}, 0 0 0 2px ${ctrlDefaultFocusOuterStrokeColor};
  }

  :host(${outlineState}) {
    background-color: ${ctrlButtonOutlineBackgroundRest};
  }

  :host(${outlineState}:hover) {
    background-color: ${ctrlButtonOutlineBackgroundHover};
  }

  :host(${outlineState}:hover:active) {
    background-color: ${ctrlButtonTransparentBackgroundPressed};
  }

  :host(${subtleState}) {
    background-color: ${ctrlButtonSubtleBackgroundRest};
    color: ${ctrlButtonTransparentForegroundColorRest};
    border-color: transparent;
  }

  :host(${subtleState}:hover) {
    background-color: ${ctrlButtonSubtleBackgroundHover};
    color: ${ctrlButtonSubtleForegroundColorHover};
    border-color: transparent;
  }

  :host(${subtleState}:hover:active) {
    background-color: ${ctrlButtonSubtleBackgroundPressed};
    color: ${ctrlButtonSubtleForegroundColorPressed};
    border-color: transparent;
  }

  :host(${subtleState}:hover) ::slotted(svg) {
    fill: ${ctrlButtonTransparentForegroundColorHover};
  }

  :host(${subtleState}:hover:active) ::slotted(svg) {
    fill: ${ctrlButtonTransparentForegroundColorPressed};
  }

  :host(${transparentState}) {
    background-color: ${ctrlButtonTransparentBackgroundRest};
    color: ${ctrlButtonTransparentForegroundColorRest};
  }

  :host(${transparentState}:hover) {
    background-color: ${ctrlButtonTransparentBackgroundHover};
    color: ${ctrlButtonTransparentForegroundColorHover};
  }

  :host(${transparentState}:hover:active) {
    background-color: ${ctrlButtonTransparentBackgroundPressed};
    color: ${ctrlButtonTransparentForegroundColorPressed};
  }

  :host(:is(${transparentState}, ${transparentState}:is(:hover, :active))) {
    border-color: transparent;
  }
`;

/**
 * The styles for the Button component.
 *
 * @public
 */
export const styles = css`
  ${baseButtonStyles}

  :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])),
  :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable]):hover),
  :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable]):hover:active) {
    background-color: ${ctrlButtonDefaultBackgroundDisabled};
    border-color: ${ctrlButtonDefaultStrokeColorDisabled};
    color: ${ctrlButtonDefaultForegroundColorDisabled};
    cursor: not-allowed;
  }

  :host(${primaryState}:is(:disabled, [disabled-focusable])),
  :host(${primaryState}:is(:disabled, [disabled-focusable]):is(:hover, :hover:active)) {
    border-color: transparent;
  }

  :host(${outlineState}:is(:disabled, [disabled-focusable])),
  :host(${outlineState}:is(:disabled, [disabled-focusable]):is(:hover, :hover:active)) {
    background-color: ${ctrlButtonOutlineBackgroundRest};
  }

  :host(${subtleState}:is(:disabled, [disabled-focusable])),
  :host(${subtleState}:is(:disabled, [disabled-focusable]):is(:hover, :hover:active)) {
    background-color: ${ctrlButtonSubtleBackgroundRest};
    border-color: transparent;
  }

  :host(${transparentState}:is(:disabled, [disabled-focusable])),
  :host(${transparentState}:is(:disabled, [disabled-focusable]):is(:hover, :hover:active)) {
    border-color: transparent;
    background-color: ${ctrlButtonTransparentBackgroundRest};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      background: ButtonFace;
      color: ButtonText;
    }

    :host(:is(:hover, :focus-visible)) {
      border-color: Highlight;
    }
  `),
);
