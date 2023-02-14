import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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
  colorPaletteRedForeground3,
  colorTransparentBackground,
  curveEasyEase,
  durationNormal,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline-flex')}

  :host {
    align-items: center;
    flex-direction: row-reverse;
    outline: none;
    user-select: none;
  }
  :host([label-position='before']) {
    flex-direction: row;
  }
  :host([label-position='above']) {
    flex-direction: column;
    align-items: flex-start;
  }
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([readonly]) .switch,
  :host([disabled]) .switch {
    cursor: not-allowed;
  }
  :host .label {
    position: relative;
    color: ${colorNeutralForeground1};
    line-height: ${lineHeightBase300};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    font-family: ${fontFamilyBase};
    padding: ${spacingVerticalXS} ${spacingHorizontalXS};
    cursor: pointer;
  }
  :host([required]) .label:after {
    content: '*';
    color: ${colorPaletteRedForeground3};
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
    border: 1px solid ${colorNeutralStrokeAccessible};
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
  :host .switch:hover {
    background: none;
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host .switch:active {
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
    top: 50%;
    margin-top: -7px;
    border-radius: 50%;
    background-color: ${colorNeutralForeground3};
  }

  :host([aria-checked='true']) .switch .checked-indicator {
    background-color: ${colorNeutralForegroundInverted};
    transform: translateX(19px);
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
  .label__hidden {
    display: none;
    visibility: hidden;
  }
  :host([aria-checked='true']) .switch {
    background: ${colorCompoundBrandBackground};
  }
  :host([aria-checked='true']) .switch:hover {
    background: ${colorCompoundBrandBackgroundHover};
    border-color: ${colorCompoundBrandBackgroundHover};
  }
  :host([aria-checked='true']) .switch:active {
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
