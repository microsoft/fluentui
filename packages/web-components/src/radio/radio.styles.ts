import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorCompoundBrandForeground1,
  colorCompoundBrandForeground1Pressed,
  colorCompoundBrandStroke,
  colorCompoundBrandStrokeHover,
  colorCompoundBrandStrokePressed,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorStrokeFocus1,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    align-items: center;
    flex-direction: row;
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
    margin: ${spacingVerticalS} ${spacingHorizontalS};
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

  :host(:focus-visible)::after {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    border-radius: ${borderRadiusMedium};
    outline: none;
    border: 2px solid ${colorStrokeFocus1};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus2};
  }

  :host([stack]) {
    flex-direction: column;
    justify-content: center;
  }
  :host([stack]) .label {
    padding: ${spacingVerticalXS} ${spacingHorizontalS} ${spacingVerticalS} ${spacingHorizontalS};
  }

  :host([stack]) .control {
    margin: ${spacingVerticalS} ${spacingHorizontalS};
  }

  :host(:not([disabled]):hover) .label {
    color: ${colorNeutralForeground2};
  }
  :host(:not([disabled])) .control:active {
    background: gray;
    border-color: darkgray;
  }
  :host(:not([disabled]):hover) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:not([disabled]):active) .control {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host([aria-checked='true']) .checked-indicator {
    opacity: 1;
  }

  :host([aria-checked='true']:not([disabled])) .label {
    color: ${colorNeutralForeground1};
  }
  :host([aria-checked='true']:not([disabled])) .control {
    border-color: ${colorCompoundBrandStroke};
  }
  :host([aria-checked='true']:not([disabled])) .checked-indicator {
    display: block;
    background-color: ${colorCompoundBrandForeground1};
  }

  :host([aria-checked='true']:hover:not([disabled])) .control {
    border-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']:hover:not([disabled])) .checked-indicator {
    border-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']:hover:not([disabled])) .label {
    border-color: ${colorNeutralForeground1};
  }

  :host([aria-checked='true']:active:not([disabled])) .label {
    color: ${colorNeutralForeground1};
  }
  :host([aria-checked='true']:active:not([disabled])) .control {
    border-color: ${colorCompoundBrandStrokePressed};
  }
  :host([aria-checked='true']:active:not([disabled])) .checked-indicator {
    background: ${colorCompoundBrandForeground1Pressed};
  }

  :host([disabled][aria-checked='true']) .control {
    border-color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled][aria-checked='true']) .checked-indicator {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]),
  :host([readonly]) {
    pointer-events: none;
  }
  :host([disabled]) .label,
  :host([readonly]) .label {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([readonly]) .control,
  :host([disabled]) .control {
    border-color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) .checked-indicator,
  :host([readonly]) .checked-indicator {
    background-color: ${colorNeutralForegroundDisabled};
  }
`;
