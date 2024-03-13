import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
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
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
    color: var(${colorNeutralForeground3});
    position: relative;
  }

  :host(:focus-visible)::after {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    border-radius: var(${borderRadiusMedium});
    outline: none;
    border: 2px solid var(${colorStrokeFocus1});
    box-shadow: inset 0 0 0 1px var(${colorStrokeFocus2});
  }

  .control {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: var(${spacingVerticalS}) var(${spacingHorizontalS});
    fill: currentcolor;
    height: 16px;
    width: 16px;
    border: var(${strokeWidthThin}) solid var(${colorNeutralStrokeAccessible});
    border-radius: var(${borderRadiusSmall});
    outline: none;
  }
  .label {
    align-self: center;
    cursor: inherit;
    padding-inline: var(${spacingHorizontalS});
    padding-bottom: var(${spacingVerticalS});
    padding-top: var(${spacingVerticalS});
  }
  .label__hidden {
    display: none;
    visibility: hidden;
  }
  .checked-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(${colorNeutralForegroundInverted});
    font-size: 12px;
    margin: auto;
    opacity: 0;
  }
  .indeterminate-indicator {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: var(${borderRadiusSmall});
    background-color: var(${colorCompoundBrandForeground1});
    opacity: 0;
  }
  :host(:hover) {
    color: var(${colorNeutralForeground2});
  }
  :host(:hover) .control {
    border-color: var(${colorNeutralStrokeAccessibleHover});
  }
  :host(:hover) .indeterminate-indicator {
    background-color: var(${colorCompoundBrandForeground1Hover});
  }
  :host(:active) .control {
    border-color: var(${colorNeutralStrokeAccessiblePressed});
  }
  :host(:active) .indeterminate-indicator {
    background-color: var(${colorCompoundBrandForeground1Pressed});
  }
  :host([aria-checked='true']),
  :host([aria-checked='mixed']),
  :host(:active) {
    color: var(${colorNeutralForeground1});
  }
  :host([aria-checked='true']) .control {
    background-color: var(${colorCompoundBrandBackground});
  }
  :host([aria-checked='true']:hover) .control {
    border-color: var(${colorCompoundBrandStrokeHover});
    background-color: var(${colorCompoundBrandBackgroundHover});
  }
  :host([aria-checked='true']:active) .control {
    background-color: var(${colorCompoundBrandBackgroundPressed});
  }
  :host([aria-checked='mixed']:hover) .control {
    border-color: var(${colorCompoundBrandStrokeHover});
  }
  :host([aria-checked='true']) .checked-indicator,
  :host([aria-checked='mixed']) .indeterminate-indicator {
    opacity: 1;
  }
  :host([aria-checked='true']) .control,
  :host([aria-checked='mixed']) .control {
    border-color: var(${colorCompoundBrandStroke});
  }
  :host([aria-checked='mixed']:active) .control,
  :host([aria-checked='true']:active) .control {
    border-color: var(${colorCompoundBrandStrokePressed});
  }
  :host([label-position='before']) {
    flex-direction: row-reverse;
  }
  :host([label-position='before']) .label {
    padding-inline: var(${spacingHorizontalS}) var(${spacingHorizontalXS});
    padding-top: var(${spacingVerticalS});
    padding-bottom: var(${spacingVerticalS});
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
    border-radius: var(${borderRadiusCircular});
  }
  :host([disabled]) .control,
  :host([aria-checked='mixed'][disabled]) .control,
  :host([aria-checked='true'][disabled]) .control {
    background-color: var(${colorTransparentBackgroundHover});
    border-color: var(${colorNeutralStrokeDisabled});
  }
  :host([aria-checked='true'][disabled]) .checked-indicator,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) .label,
  :host([aria-checked='mixed'][disabled]) .label,
  :host([aria-checked='true'][disabled]) .label {
    color: var(${colorNeutralForegroundDisabled});
  }
  :host([disabled]) .indeterminate-indicator {
    background-color: var(${colorNeutralForegroundDisabled});
  }
`;
