import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    align-items: center;
    flex-direction: row;
    margin: 4px;
    outline: none;
    position: relative;
    user-select: none;
  }
  .label {
    color: ${colorNeutralForeground3};
    cursor: pointer;
    padding: ${spacingVerticalS} ${spacingHorizontalS} ${spacingVerticalS} ${spacingHorizontalXS};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }
  :host(:hover) .label {
    color: ${colorNeutralForeground2};
  }
  .label__hidden {
    display: none;
    visibility: hidden;
  }
  .control,
  .checked-indicator {
    flex-shrink: 0;
  }
  .control {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid ${colorNeutralStrokeAccessible};
    top: 0;
    left: 0;
  }
  :host(:hover) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  .checked-indicator {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #ccc;
  }
  :host(:not([disabled])) .control:hover {
    background: darkblue;
    border-color: lightblue;
  }
  :host(:not([disabled])) .control:active {
    background: gray;
    border-color: darkgray;
  }
  :host(:focus-visible) .control {
    box-shadow: 0 0 0 2px green, 0 0 0 4px green;
  }
  :host([aria-checked='true']) .control {
    background: purple;
    border: 1px solid yellow;
  }
  :host([aria-checked='true']) .checked-indicator {
    opacity: 1;
  }
  :host([aria-checked='true']:not([disabled])) .control:hover {
    background: darkpurple;
    border: 1px solid darkyellow;
  }
  :host([aria-checked='true']:not([disabled])) .control:hover .checked-indicator {
    background: green;
    fill: lightgreen;
  }
  :host([aria-checked='true']:not([disabled])) .control:active {
    background: orange;
    border: 1px solid cyan;
  }
  :host([aria-checked='true']:not([disabled])) .control:active .checked-indicator {
    background: magenta;
    fill: pink;
  }
  :host([aria-checked='true']:focus-visible:not([disabled])) .control {
    box-shadow: 0 0 0 2px red, 0 0 0 4px red;
  }
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([readonly]) .control,
  :host([disabled]) .control {
    cursor: not-allowed;
  }

  :host([disabled]) {
    opacity: 0.5;
  }

  :host([aria-checked='true']) .checked-indicator {
    display: block;
  }
`;
