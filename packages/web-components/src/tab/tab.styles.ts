import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandStroke,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1Hover,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightBold,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalMNudge,
} from '../theme/design-tokens.js';

export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    justify-content: center;
    color: ${colorNeutralForeground1};
    fill: currentcolor;
    font-family: ${fontFamilyBase};
    grid-row: 1;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    padding-top: ${spacingHorizontalM};
    padding-bottom: ${spacingHorizontalM};
    padding-left: ${spacingHorizontalMNudge};
    padding-right: ${spacingHorizontalMNudge};
    border-radius: ${borderRadiusMedium};
  }

  :host([aria-selected='true']),
  :host([aria-selected='true'][disabled]) {
    font-weight: ${fontWeightBold};
  }

  :host([aria-selected='true'])::after {
    background-color: ${colorCompoundBrandStroke};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
  }

  :host([aria-selected='false']:hover)::before {
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
    background-color: ${colorNeutralStroke1Hover};
  }

  :host([aria-selected='true'][disabled])::after {
    background-color: ${colorNeutralForegroundDisabled};
  }

  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
  }
  ::slotted([slot='start']) {
    margin-inline-end: 11px;
  }
  ::slotted([slot='end']) {
    margin-inline-start: 11px;
  }
  :host([disabled]) {
    cursor: not-allowed;
    fill: ${colorNeutralForegroundDisabled};
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]:hover)::before {
    background-color: unset;
  }

  :host(:focus-visible) {
    outline: none;
  }
  :host(:focus) {
    outline: none;
  }

  :host(:focus-visible) {
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 2pt ${colorNeutralForeground1};
    outline: none;
  }
`;
