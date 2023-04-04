import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusCircular,
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorCompoundBrandForeground1,
  colorCompoundBrandForeground1Hover,
  colorCompoundBrandForeground1Pressed,
  colorCompoundBrandStroke,
  colorCompoundBrandStrokeHover,
  colorCompoundBrandStrokePressed,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorTransparentBackgroundHover,
  fontFamilyBase,
  fontSizeBase300,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
  strokeWidthThin,
} from '../theme/design-tokens.js';

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
    pointer-events: pointer;
  }
  .control {
    position: relative;
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colorNeutralForegroundInverted};
    height: 16px;
    font-size: 12px;
    margin: auto;
  }
  .indeterminate-indicator {
    background-color: ${colorCompoundBrandForeground1};
    height: 8px;
    width: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    transform: translate(-50%, -50%);
    border-radius: ${borderRadiusSmall};
  }
  :host([label-position='before']) {
    flex-direction: row-reverse;
  }
  :host([label-position='before']) .label {
    padding: ${spacingVerticalS} ${spacingHorizontalXS} ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host([size='large']) .control {
    width: 20px;
    height: 20px;
  }
  :host([size='large']) .checked-indicator {
    font-size: 16px;
    height: 20px;
  }
  :host([aria-checked='mixed'][size='large']) .indeterminate-indicator {
    width: 10px;
    height: 10px;
  }
  :host([shape='circular']) .indeterminate-indicator,
  :host([shape='circular']) .control {
    border-radius: ${borderRadiusCircular};
  }

  :host([aria-checked='mixed']:hover) .control {
    border-color: ${colorCompoundBrandStrokeHover};
  }
  :host(:hover) .indeterminate-indicator {
    background-color: ${colorCompoundBrandForeground1Hover};
  }
  :host([aria-checked='mixed']:active) .control {
    border-color: ${colorCompoundBrandStrokePressed};
  }
  :host(:active) .indeterminate-indicator {
    background-color: ${colorCompoundBrandForeground1Pressed};
  }
  :host([aria-checked='mixed']:disabled) .control {
    border-color: ${colorNeutralStrokeDisabled};
  }
  :host(:disabled) .indeterminate-indicator {
    background-color: ${colorNeutralForegroundDisabled};
  }
  :host(:hover) .label {
    color: ${colorNeutralForeground2};
  }
  :host(:active) .label {
    color: ${colorNeutralForeground1};
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
  :host([aria-checked='true']) .control {
    background-color: ${colorCompoundBrandBackground};
  }
  :host([aria-checked='true']:hover) .control {
    background-color: ${colorCompoundBrandBackgroundHover};
  }
  :host([aria-checked='true']:active) .control {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host([aria-checked='true']) .control,
  :host([aria-checked='mixed']) .control {
    border-color: ${colorCompoundBrandStroke};
  }
  :host([aria-checked='true']:disabled) .control {
    background-color: ${colorTransparentBackgroundHover};
  }
  :host([aria-checked='true']:disabled) .checked-indicator,
  :host(:disabled) .label,
  :host([aria-checked='true']:disabled) .label {
    color: ${colorNeutralForegroundDisabled};
  }
  :host(:disabled) .control {
    border-color: ${colorNeutralStrokeDisabled};
  }
  :host([aria-checked='true']) .checked-indicator,
  :host([aria-checked='mixed']) .indeterminate-indicator {
    opacity: 1;
  }
`;
