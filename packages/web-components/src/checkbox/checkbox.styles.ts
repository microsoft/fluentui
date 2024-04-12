import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusMedium,
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
  colorStrokeFocus1,
  colorStrokeFocus2,
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
  ${display('inline-flex')}
  :host {
    align-items: center;
    outline: none;
    user-select: none;
    vertical-align: middle;
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground3};
    position: relative;
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

  .control {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: ${spacingVerticalS} ${spacingHorizontalS};
    fill: currentcolor;
    height: 16px;
    width: 16px;
    border: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusSmall};
    outline: none;
  }
  .label {
    align-self: center;
    cursor: inherit;
    padding-inline: ${spacingHorizontalS};
    padding-bottom: ${spacingVerticalS};
    padding-top: ${spacingVerticalS};
  }
  .label__hidden {
    display: none;
    visibility: hidden;
  }
  .checked-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colorNeutralForegroundInverted};
    font-size: 12px;
    margin: auto;
    opacity: 0;
  }
  .indeterminate-indicator {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: ${borderRadiusSmall};
    background-color: ${colorCompoundBrandForeground1};
    opacity: 0;
  }
  :host(:hover) {
    color: ${colorNeutralForeground2};
  }
  :host(:hover) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:hover) .indeterminate-indicator {
    background-color: ${colorCompoundBrandForeground1Hover};
  }
  :host(:active) .control {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host(:active) .indeterminate-indicator {
    background-color: ${colorCompoundBrandForeground1Pressed};
  }
  :host([aria-checked='true']),
  :host([aria-checked='mixed']),
  :host(:active) {
    color: ${colorNeutralForeground1};
  }
  :host([aria-checked='true']) .control {
    background-color: ${colorCompoundBrandBackground};
  }
  :host([aria-checked='true']:hover) .control {
    border-color: ${colorCompoundBrandStrokeHover};
    background-color: ${colorCompoundBrandBackgroundHover};
  }
  :host([aria-checked='true']:active) .control {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host([aria-checked='mixed']:hover) .control {
    border-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']) .checked-indicator,
  :host([aria-checked='mixed']) .indeterminate-indicator {
    opacity: 1;
  }
  :host([aria-checked='true']) .control,
  :host([aria-checked='mixed']) .control {
    border-color: ${colorCompoundBrandStroke};
  }
  :host([aria-checked='mixed']:active) .control,
  :host([aria-checked='true']:active) .control {
    border-color: ${colorCompoundBrandStrokePressed};
  }
  :host([label-position='before']) {
    flex-direction: row-reverse;
  }
  :host([label-position='before']) .label {
    padding-inline: ${spacingHorizontalS} ${spacingHorizontalXS};
    padding-top: ${spacingVerticalS};
    padding-bottom: ${spacingVerticalS};
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
    height: 10px;
    width: 10px;
  }
  :host([shape='circular']) .control,
  :host([shape='circular']) .indeterminate-indicator {
    border-radius: ${borderRadiusCircular};
  }
  :host([disabled]) .control,
  :host([aria-checked='mixed'][disabled]) .control,
  :host([aria-checked='true'][disabled]) .control {
    background-color: ${colorTransparentBackgroundHover};
    border-color: ${colorNeutralStrokeDisabled};
  }
  :host([aria-checked='true'][disabled]) .checked-indicator,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) .label,
  :host([aria-checked='mixed'][disabled]) .label,
  :host([aria-checked='true'][disabled]) .label {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) .indeterminate-indicator {
    background-color: ${colorNeutralForegroundDisabled};
  }
`;
