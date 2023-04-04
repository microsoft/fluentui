import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundPressed,
  colorCompoundBrandForeground1,
  colorCompoundBrandStroke,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  fontFamilyBase,
  fontSizeBase300,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
  strokeWidthThin,
} from '../index-rollup.js';

/** Checkbox styles
 *
 * @public
 */
export const styles = css`
  ${display('block')}
  :host {
    align-items: center;
    display: inline-flex;
    outline: none;
    user-select: none;
    vertical-align: middle;
  }
  .control {
    position: relative;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-radius: 0;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusSmall};
    margin: ${spacingVerticalS} ${spacingHorizontalS};
    outline: none;
    fill: currentcolor;
    pointer-events: none;
    font-size: 12px;
    height: 16px;
    width: 16px;
  }
  .label {
    font-family: ${fontFamilyBase};
    color: ${colorNeutralForeground3};
    cursor: inherit;
    align-self: center;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    padding: ${spacingVerticalS} ${spacingHorizontalS} ${spacingVerticalS} ${spacingHorizontalXS};
  }
  .label__hidden {
    display: none;
    visibility: hidden;
  }
  .checked-indicator,
  .indeterminate-indicator {
    display: block;
    pointer-events: none;
    opacity: 0;
  }
  .checked-indicator {
    color: ${colorNeutralForegroundInverted};
    height: 12px;
    width: 12px;
  }
  .indeterminate-indicator {
    background-color: ${colorCompoundBrandForeground1};
    border-radiuis: ${borderRadiusSmall};
    height: 8px;
    width: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
  }
  :host(:hover) .label {
    color: ${colorNeutralForeground2};
  }
  :host(:active) .label {
    color: ${colorNeutralForeground1};
  }
  :host(:disabled) .label {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([aria-checked='true']) .label {
    color: ${colorNeutralForeground1};
  }

  :host(:hover) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) .control {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(:disabled) .control {
    color: ${colorNeutralStrokeDisabled};
  }
  :host([aria-checked='true']) .control {
    background-color: ${colorCompoundBrandBackground};
  }
  :host([aria-checked='true']) .control,
  :host([aria-checked='mixed']) .control {
    border-color: ${colorCompoundBrandStroke};
  }
  :host([aria-checked='true']) .checked-indicator,
  :host([aria-checked='mixed']) .indeterminate-indicator {
    opacity: 1;
  }
`;
