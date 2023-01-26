import { css } from '@microsoft/fast-element';
import {
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground3Hover,
  colorNeutralForeground3Pressed,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralForegroundInvertedHover,
  colorNeutralForegroundInvertedPressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorTransparentBackground,
  curveEasyEase,
  durationNormal,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightSemibold,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalXXS,
  spacingVerticalMNudge,
  spacingVerticalS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    display: inline-flex;
    align-items: center;
    outline: none;
    user-select: none;
  }
  :host([labelposition='before']) {
    flex-direction: row-reverse;
  }
  :host([labelposition='above']) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([readonly]) .switch,
  :host([disabled]) .switch {
    cursor: not-allowed;
  }
  :host .status-message {
    color: ${colorNeutralForeground1};
    line-height: ${lineHeightBase300};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightSemibold};
    font-family: ${fontFamilyBase};
    padding: ${spacingVerticalXS} ${spacingHorizontalS} ${spacingVerticalXS} ${spacingHorizontalS};
  }
  :host([disabled]) .status-message {
    color: ${colorNeutralForegroundDisabled};
  }
  :host .switch {
    position: relative;
    box-sizing: border-box;
    width: 40px;
    height: 20px;
    background-color: ${colorTransparentBackground};
    border: 1px solid;
    border-color: ${colorNeutralStrokeAccessible};
    border-radius: 10px;
    outline: none;
    cursor: pointer;
    margin: ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host .switch * {
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveEasyEase};
    transition-property: transform;
  }
  :host(:not([disabled])) .switch:hover {
    background: none;
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:not([disabled])) .switch:active {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host([disabled]) .switch,
  :host([readonly]) .switch {
    border: 1px solid ${colorNeutralStrokeDisabled};
    background-color: none;
    pointer: default;
  }
  :host .switch .checked-indicator {
    position: absolute;
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    border-radius: 50%;
    background-color: ${colorNeutralForeground3};
  }
  :host([aria-checked='true']) .switch .checked-indicator {
    transform: translateX(19px);
  }
  :host([aria-checked='true']) .switch .checked-indicator {
    background-color: ${colorNeutralForegroundInverted};
  }
  :host([aria-checked='true']) .switch:hover .checked-indicator {
    background: ${colorNeutralForegroundInvertedHover};
  }
  :host([aria-checked='true']) .switch:active .checked-indicator {
    background: ${colorNeutralForegroundInvertedPressed};
  }
  .switch:hover .checked-indicator {
    background-color: ${colorNeutralForeground3Hover};
  }
  .switch:active .checked-indicator {
    background-color: ${colorNeutralForeground3Pressed};
  }
  :host([disabled]) .switch .checked-indicator,
  :host([readonly]) .switch .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) .status-message,
  :host([readonly]) .status-message {
    cursor: pointer;
  }
  .label {
    color: ${colorNeutralForeground1};
    font-size: ${fontSizeBase300};
    line-height: l ${lineHeightBase300};
    cursor: pointer;
  }
  .label__hidden {
    display: none;
    visibility: hidden;
  }
  :host([aria-checked='true']) .switch {
    background: ${colorCompoundBrandBackground};
  }
  :host([aria-checked='true']:not([disabled])) .switch:hover {
    background: ${colorCompoundBrandBackgroundHover};
    border-color: ${colorCompoundBrandBackgroundHover};
  }
  :host([aria-checked='true']:not([disabled])) .switch:active {
    background: ${colorCompoundBrandBackgroundPressed};
    border-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host([aria-checked='true'][disabled]) .switch {
    background: ${colorNeutralBackgroundDisabled};
  }
  :host([aria-checked='true'][disabled]) .switch .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }

  .unchecked-message {
    display: block;
  }
  .checked-message {
    display: none;
  }
  :host([aria-checked='true']) .unchecked-message {
    display: none;
  }
  :host([aria-checked='true']) .checked-message {
    display: block;
  }
`;
