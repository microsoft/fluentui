import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorCompoundBrandStrokePressed,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralBackgroundInverted,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorPaletteRedBorder2,
  colorTransparentBackground,
  colorTransparentStroke,
  colorTransparentStrokeInteractive,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontSizeBase600,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  shadow2,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalSNudge,
  spacingVerticalXS,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import {
  filledDarkerState,
  filledLighterState,
  largeState,
  outlineState,
  smallState,
  underlineState,
} from '../styles/states/index.js';

const resizeHorizontalState = `:is(:state(resize-horizontal), [state--resize-horizontal])`;

const resizeVerticalState = `:is(:state(resize-vertical), [state--resize-vertical])`;

const resizeBothState = `:is(:state(resize-both), [state--resize-both])`;

/**
 * Styles for the TextArea component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('inline-block')}

  :host {
    contain: content;
    align-items: start;
    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    max-height: 20em;
    min-width: 20em;
    position: relative;
  }

  :host(${outlineState}:focus-within) {
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
  }

  :host(:focus-within) {
    outline: transparent solid 2px;
    border-bottom: 0;
  }

  :host::after {
    border-bottom: 2px solid ${colorCompoundBrandStroke};
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    box-sizing: border-box;
    clip-path: inset(calc(100% - 2px) 1px 0px);
    content: '';
    height: max(2px, ${borderRadiusMedium});
    inset: auto -1px 0;
    position: absolute;
    transform: scaleX(0);
    transition-delay: ${curveAccelerateMid};
    transition-duration: ${durationUltraFast};
    transition-property: transform;
  }

  :host(:focus-within)::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }

  :host(:focus-within:active):after {
    border-bottom-color: ${colorCompoundBrandStrokePressed};
  }

  :host(${resizeBothState}) .control {
    resize: both;
  }
  :host(${resizeHorizontalState}) .control {
    resize: horizontal;
  }
  :host(${resizeVerticalState}) .control {
    resize: vertical;
  }
  :host(${smallState}) {
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    height: 24px;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalSNudge};
  }

  .textbox {
  }
`;

const oldStyles = css`
  .control {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusMedium};
    background: ${colorTransparentBackground};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    font-size: ${fontSizeBase300};
    border: none;
    vertical-align: center;
  }
  :host(:hover) {
    border-color: ${colorNeutralStroke1Hover};
    border-bottom-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) {
    border-color: ${colorNeutralStroke1Pressed};
  }
  :host(:focus-within) .control {
    color: ${colorNeutralForeground1};
  }
  :host([disabled]) {
    background: ${colorTransparentBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeDisabled};
  }
  :host([disabled]) .control::placeholder,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) ::slotted([slot='end']) {
    color: ${colorNeutralForegroundDisabled};
  }
  ::selection {
    color: ${colorNeutralForegroundInverted};
    background-color: ${colorNeutralBackgroundInverted};
  }
  :host(${smallState}) .control {
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
  }
  :host(${smallState}) {
    height: 24px;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalSNudge};
  }
  :host(${largeState}) .control {
    font-size: ${fontSizeBase400};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase400};
  }
  :host(${largeState}) {
    height: 40px;
    gap: ${spacingHorizontalS};
    padding: 0 ${spacingHorizontalM};
  }
  :host(${underlineState}) {
    background: ${colorTransparentBackground};
    border: 0;
    border-radius: 0;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
  }
  :host(${underlineState}:hover) {
    border-bottom-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(${underlineState}:active) {
    border-bottom-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(${underlineState}:focus-within) {
    border: 0;
    border-bottom-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(${underlineState}[disabled]) {
    border-bottom-color: ${colorNeutralStrokeDisabled};
  }
  :host(${filledLighterState}),
  :host(${filledDarkerState}) {
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow2};
  }
  :host(${filledLighterState}) {
    background: ${colorNeutralBackground1};
  }
  :host(${filledDarkerState}) {
    background: ${colorNeutralBackground3};
  }
  :host(${filledLighterState}:hover),
  :host(${filledDarkerState}:hover) {
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host(${filledLighterState}:active),
  :host(${filledDarkerState}:active) {
    border-color: ${colorTransparentStrokeInteractive};
    background: ${colorNeutralBackground3};
  }
`;
