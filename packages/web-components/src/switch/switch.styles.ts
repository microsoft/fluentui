import { css } from '@microsoft/fast-element';
import {
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorNeutralBackgroundDisabled,
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
  fontSizeBase300,
  fontWeightSemibold,
  lineHeightBase300,
} from '../theme/design-tokens.js';

export const styles = css`
  :host {
    position: relative;
    display: inline-block;
    width: fit-content;
  }

  :host input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  :host .dcs-switch-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: auto;
    padding: 8px;
  }

  :host .track {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 20px;
    margin: 8px 8px 8px 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: all 0.1s ease 0s;
    transition: all 0.1s ease 0s;
    border-radius: 34px;
    border: 1px solid ${colorNeutralStrokeAccessible};
    background-color: ${colorTransparentBackground};
  }

  :host .track:before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    background-color: ${colorNeutralForeground3};
  }

  :host::part(container) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  :host::part(label),
  :host::part(checked-message),
  :host::part(unchecked-message),
  :host::part(static-message) {
    line-height: ${lineHeightBase300};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightSemibold};
  }

  :host::part(unchecked-message) {
    line-height: ${lineHeightBase300};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightSemibold};
  }

  :host([isChecked='true'])::part(unchecked-message),
  :host([isChecked='false'])::part(checked-message) {
    display: none;
  }

  :host([isDisabled='true'])::part(static-message),
  :host([isDisabled='true'])::part(checked-message),
  :host([isDisabled='true'])::part(unchecked-message) {
    color: ${colorNeutralForegroundDisabled};
  }

  :host([isDisabled='true']) label {
    color: ${colorNeutralForegroundDisabled};
  }

  :host([isDisabled='false']) .dcs-switch-container:hover .track {
    border: 1px solid ${colorNeutralStrokeAccessibleHover};
  }
  :host([isDisabled='false']) .dcs-switch-container:active .track {
    border: 1px solid ${colorNeutralStrokeAccessiblePressed};
  }

  :host([isDisabled='false']) .dcs-switch-container:hover .track:before {
    background-color: ${colorNeutralForeground3Hover};
  }

  :host([isDisabled='false']) .dcs-switch-container:active .track:before {
    background-color: ${colorNeutralForeground3Pressed};
  }

  :host([isDisabled='false']) input:checked + .track {
    background-color: ${colorCompoundBrandBackground};
    border: 1px solid ${colorCompoundBrandBackground};
  }

  :host([isDisabled='false']) .dcs-switch-container:hover input:checked + .track {
    background-color: ${colorCompoundBrandBackgroundHover};
    border: 1px solid ${colorCompoundBrandBackgroundHover};
  }

  :host([isDisabled='false']) .dcs-switch-container:active input:checked + .track {
    background-color: ${colorCompoundBrandBackgroundPressed};
    border: 1px solid ${colorCompoundBrandBackgroundPressed};
  }

  :host([isDisabled='false']) input:checked + .track:before {
    background-color: ${colorNeutralForegroundInverted};
  }

  :host([isDisabled='false']) .dcs-switch-container:hover input:checked + .track:before {
    background-color: ${colorNeutralForegroundInvertedHover};
  }

  :host([isDisabled='false']) .dcs-switch-container:active input:checked + .track:before {
    background-color: ${colorNeutralForegroundInvertedPressed};
  }

  :host([isDisabled='true']) * {
    cursor: default;
  }

  :host([isDisabled='true']) .track {
    border: 1px solid ${colorNeutralStrokeDisabled};
    background-color: ${colorTransparentBackground};
  }

  :host([isDisabled='true']) input:checked + .track {
    border: 1px solid ${colorNeutralBackgroundDisabled};
    background-color: ${colorNeutralBackgroundDisabled};
  }

  :host([isDisabled='true']) .track:before {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host input:checked + .track:before {
    -webkit-transform: translateX(20x);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
`;
