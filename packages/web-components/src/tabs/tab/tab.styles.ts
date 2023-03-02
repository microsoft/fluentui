import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1Hover,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightBold,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalMNudge,
} from '../../theme/design-tokens.js';

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

  :host(:active) {
    color: ${colorNeutralForeground1};
    fill: ${colorNeutralForeground1};
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

  :host([disabled]:hover) {
    color: ${colorNeutralForegroundDisabled};
  }

  :host([aria-selected='false']:hover)::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: 0 3px 0 0 ${colorNeutralStroke1Hover};
    height: 3px;
    outline: none;
    margin-top: auto;
    border-radius: 3px;
  }
  :host([disabled][aria-selected='false']:hover)::after {
    box-shadow: unset;
  }

  :host(:focus-visible) {
    outline: none;
  }
  :host(:focus) {
    outline: none;
  }
  :host(.vertical) {
    justify-content: start;
    grid-column: 2;
  }
  :host(.vertical[aria-selected='true']) {
    z-index: 2;
  }
  :host([aria-selected='false'].vertical:hover)::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: -3px 0 0 0 ${colorNeutralStroke1Hover};
    height: ${fontSizeBase300};
    width: 3px;
    outline: none;
    border-radius: 3px;
    margin-bottom: auto;
  }
  :host([disabled][aria-selected='false'].vertical:hover)::after {
    box-shadow: unset;
  }

  :host(:focus-visible)::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 4pt ${colorNeutralForeground1};
    outline: none;
  }
  :host(:focus-visible)::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 2pt ${colorNeutralBackground1};
    outline: none;
  }
`;
