import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusCircular,
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
  spacingVerticalSNudge,
  spacingVerticalXS,
} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    height: 32px;
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    outline: none;
    position: relative;
    user-select: none;
  }
  .label {
    color: ${colorNeutralForeground3};
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    padding: ${spacingVerticalSNudge} ${spacingHorizontalS} ${spacingVerticalSNudge} ${spacingHorizontalXS};
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }
  .control {
    box-sizing: border-box;
    align-items: center;
    border: 1px solid ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusCircular};
    display: flex;
    height: 16px;
    justify-content: center;
    margin: ${spacingVerticalS} ${spacingHorizontalS};
    position: relative;
    width: 16px;
  }
  .checked-indicator {
    border-radius: ${borderRadiusCircular};
    height: 10px;
    opacity: 0;
    width: 10px;
  }

  :host(:focus-visible)::after {
    border: 2px solid ${colorStrokeFocus1};
    border-radius: ${borderRadiusMedium};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus2};
    content: '';
    cursor: pointer;
    inset: 0px;
    outline: none;
    position: absolute;
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

  :host(:not([disabled]):active) .label {
    color: ${colorNeutralForeground1};
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
    background-color: ${colorCompoundBrandForeground1};
    display: block;
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
`;
