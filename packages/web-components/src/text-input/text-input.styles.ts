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

/**
 * Styles for the TextInput component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('block')}

  :host {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    max-width: 400px;
  }
  .label {
    display: flex;
    color: ${colorNeutralForeground1};
    padding-bottom: ${spacingVerticalXS};
    flex-shrink: 0;
    padding-inline-end: ${spacingHorizontalXS};
  }

  .label[hidden],
  :host(:empty) .label {
    display: none;
  }

  .root {
    align-items: center;
    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    height: 32px;
    display: inline-flex;
    flex-direction: row;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalMNudge};
    position: relative;
    width: 100%;
  }

  :has(.control:user-invalid) {
    border-color: ${colorPaletteRedBorder2};
  }

  .root::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: -1px;
    bottom: 0px;
    right: -1px;
    height: max(2px, ${borderRadiusMedium});
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    border-bottom: 2px solid ${colorCompoundBrandStroke};
    clip-path: inset(calc(100% - 2px) 1px 0px);
    transform: scaleX(0);
    transition-property: transform;
    transition-duration: ${durationUltraFast};
    transition-delay: ${curveAccelerateMid};
  }
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
  .control:focus-visible {
    outline: 0;
    border: 0;
  }
  .control::placeholder {
    color: ${colorNeutralForeground4};
  }
  :host ::slotted([slot='start']),
  :host ::slotted([slot='end']) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colorNeutralForeground3};
    font-size: ${fontSizeBase500};
  }
  :host ::slotted([slot='start']) {
    padding-right: ${spacingHorizontalXXS};
  }
  :host ::slotted([slot='end']) {
    padding-left: ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
  }
  :host(:hover) .root {
    border-color: ${colorNeutralStroke1Hover};
    border-bottom-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) .root {
    border-color: ${colorNeutralStroke1Pressed};
  }
  :host(:focus-within) .root {
    outline: transparent solid 2px;
    border-bottom: 0;
  }
  :host(:focus-within) .root::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }
  :host(:focus-within:active) .root:after {
    border-bottom-color: ${colorCompoundBrandStrokePressed};
  }
  :host(${outlineState}:focus-within) .root {
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
  }
  :host(:focus-within) .control {
    color: ${colorNeutralForeground1};
  }
  :host([disabled]) .root {
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
  :host(${smallState}) .root {
    height: 24px;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalSNudge};
  }
  :host(${smallState}) ::slotted([slot='start']),
  :host(${smallState}) ::slotted([slot='end']) {
    font-size: ${fontSizeBase400};
  }
  :host(${largeState}) .control {
    font-size: ${fontSizeBase400};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase400};
  }
  :host(${largeState}) .root {
    height: 40px;
    gap: ${spacingHorizontalS};
    padding: 0 ${spacingHorizontalM};
  }
  :host(${largeState}) ::slotted([slot='start']),
  :host(${largeState}) ::slotted([slot='end']) {
    font-size: ${fontSizeBase600};
  }
  :host(${underlineState}) .root {
    background: ${colorTransparentBackground};
    border: 0;
    border-radius: 0;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
  }
  :host(${underlineState}:hover) .root {
    border-bottom-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(${underlineState}:active) .root {
    border-bottom-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(${underlineState}:focus-within) .root {
    border: 0;
    border-bottom-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(${underlineState}[disabled]) .root {
    border-bottom-color: ${colorNeutralStrokeDisabled};
  }
  :host(${filledLighterState}) .root,
  :host(${filledDarkerState}) .root {
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow2};
  }
  :host(${filledLighterState}) .root {
    background: ${colorNeutralBackground1};
  }
  :host(${filledDarkerState}) .root {
    background: ${colorNeutralBackground3};
  }
  :host(${filledLighterState}:hover) .root,
  :host(${filledDarkerState}:hover) .root {
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host(${filledLighterState}:active) .root,
  :host(${filledDarkerState}:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
    background: ${colorNeutralBackground3};
  }
`;
