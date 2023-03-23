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
  colorNeutralForegroundDisabled,
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
    color: var(--label-color);
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
    border: 1px solid var(--control-border-color);
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
    box-shadow: inset 0 0 0 2px ${colorStrokeFocus2};
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

  :host(:hover) .label {
    color: ${colorNeutralForeground2};
  }

  :host(:active) .label {
    color: ${colorNeutralForeground1};
  }

  :host(:hover) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host(:active) .control {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host([aria-checked='true']) .checked-indicator {
    opacity: 1;
  }

  :host([aria-checked='true']) .label {
    color: ${colorNeutralForeground1};
  }

  :host([aria-checked='true']) .control {
    border-color: var(--control-border-color);
  }

  :host([aria-checked='true']) .checked-indicator {
    background-color: var(--checked-indicator-background-color);
    display: block;
  }

  :host([readonly]) .control,
  :host([disabled]) .control {
    pointer-events; None;
  }

  :host([aria-checked='true']:hover) .control {
    border-color: ${colorCompoundBrandStrokeHover};
  }

  :host([aria-checked='true']:hover) .checked-indicator {
    background-color: ${colorCompoundBrandStrokeHover};
  }

  :host([aria-checked='true']:hover) .label {
    border-color: ${colorNeutralForeground1};
  }

  :host([aria-checked='true']:active) .label {
    color: ${colorNeutralForeground1};
  }

  :host([aria-checked='true']:active) .control {
    border-color: ${colorCompoundBrandStrokePressed};
  }

  :host([aria-checked='true']:active) .checked-indicator {
    background: ${colorCompoundBrandForeground1Pressed};
  }

  :host([readonly]) .control,
  :host([disabled]) .control {
    pointer-events; None;
    border-color: ${colorNeutralForegroundDisabled};
  }
`;
