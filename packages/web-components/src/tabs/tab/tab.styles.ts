import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  borderRadiusSmall,
  colorNeutralBackground1,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
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
    line-height: ${lineHeightBase300};
    box-sizing: border-box;
    justify-content: center;

    color: var(--neutral-foreground-hint);

    fill: currentcolor;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    grid-row: 1;

    padding-top: ${spacingHorizontalM};
    padding-bottom: ${spacingHorizontalM};
    padding-left: ${spacingHorizontalMNudge};
    padding-right: ${spacingHorizontalMNudge};

    border-radius: ${borderRadiusMedium};
  }
  :host(:hover) {
    color: var(--neutral-foreground-rest);
    fill: currentcolor;
  }
  /* :host([aria-selected="true"]) {
    border-color: 
  } */

  :host(:active) {
    color: var(--neutral-foreground-rest);
    fill: currentcolor;
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
    cursor: var(--disabled-cursor);
    opacity: var(--disabled-opacity);
  }
  :host([disabled]:hover) {
    color: var(--neutral-foreground-hint);
    background: var(--neutral-fill-stealth-rest);
  }
  :host([aria-selected='true']) {
    background: var(--neutral-fill-rest);
    color: var(--accent-foreground-rest);
    fill: currentcolor;
  }
  :host([aria-selected='true']:hover) {
    background: var(--neutral-fill-hover);
    color: var(--accent-foreground-hover);
    fill: currentcolor;
  }
  :host([aria-selected='true']:active) {
    background: var(--neutral-fill-active);
    color: var(--accent-foreground-active);
    fill: currentcolor;
  }

  :host(:focus-visible) {
    outline: none;
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

  :host(:focus) {
    outline: none;
  }
  :host(.vertical) {
    justify-content: end;
    grid-column: 2;
  }
  :host(.vertical[aria-selected='true']) {
    z-index: 2;
  }
  :host(.vertical:hover) {
    color: var(--neutral-foreground-rest);
  }
  :host(.vertical:active) {
    color: var(--neutral-foreground-rest);
  }
`;
