import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorCompoundBrandForeground1Pressed,
  colorCompoundBrandStrokeHover,
  colorCompoundBrandStrokePressed,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
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
} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    grid-auto-flow: column;
    grid-template-columns: max-content;
    gap: ${spacingHorizontalXS};
    align-items: center;
    height: 32px;
    cursor: pointer;
    outline: none;
    position: relative;
    user-select: none;
    color: var(--state-color);
  }
  :host([disabled]),
  :host([required]) {
    color: ${colorNeutralForegroundDisabled};
  }
  .label {
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    margin-inline-end: ${spacingHorizontalS};
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
  :host([aria-checked='false']:hover:not([disabled])) .control {
    color: ${colorNeutralForeground2};
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
  :host(:hover:not([disabled])) .control {
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active:not([disabled])) .control {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host([aria-checked='true']:not([disabled])) .checked-indicator {
    opacity: 1;
  }
  :host([aria-checked='true']:not([disabled])) .control {
    border-color: var(--control-border-color);
  }
  :host([aria-checked='true']:not([disabled])) .checked-indicator {
    background-color: var(--checked-indicator-background-color);
    display: block;
  }
  :host([disabled]) .control {
    pointer-events: none;
  }
  :host([aria-checked='true']:hover:not([disabled])) .control {
    border-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']:hover:not([disabled])) .checked-indicator {
    background-color: ${colorCompoundBrandStrokeHover};
  }
  :host([aria-checked='true']:active:not([disabled])) .control {
    border-color: ${colorCompoundBrandStrokePressed};
  }
  :host([aria-checked='true']:active:not([disabled])) .checked-indicator {
    background: ${colorCompoundBrandForeground1Pressed};
  }
  :host([disabled]) .control {
    pointer-events: none;
    border-color: ${colorNeutralForegroundDisabled};
  }
  :host([required]) .checked-indicator {
    background-color: ${colorNeutralForegroundDisabled};
  }
`;
