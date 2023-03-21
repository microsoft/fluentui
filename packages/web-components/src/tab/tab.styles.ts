import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandStroke,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1Hover,
  colorStrokeFocus1,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightSemibold,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalMNudge,
  spacingVerticalSNudge,
  strokeWidthThicker,
} from '../theme/design-tokens.js';

export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    position: relative;
    display: inline-flex;
    flex-direction: column;
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
    font-weight: ${fontWeightSemibold};
  }

  /* adds hidden textContent to prevent shifting ui on bold / unbolding of text */
  :host::before {
    content: var(--textContent);
    font-weight: ${fontWeightSemibold};
    height: 0;
    line-height: ${lineHeightBase300};
    visibility: hidden;
  }

  /* adds a secondary indicator placeholder that appears right after click on the active tab */
  :host::part(indicator-placeholder) {
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    margin-top: auto;
    z-index: 2;
  }
  :host([aria-selected='true'])::part(indicator-placeholder) {
    background-color: ${colorNeutralForegroundDisabled};
  }

  :host:host-context([orientation='horizontal'])::part(indicator-placeholder) {
    height: ${strokeWidthThicker};
  }
  :host:host-context([orientation='vertical'])::part(indicator-placeholder) {
    height: unset;
    width: ${strokeWidthThicker};
    margin-right: auto;
    transform-origin: top;
  }

  :host([aria-selected='true']):host-context([orientation='horizontal'][size='small'])::part(indicator-placeholder) {
    right: ${spacingHorizontalSNudge};
    left: ${spacingHorizontalSNudge};
  }
  :host([aria-selected='true']):host-context([orientation='horizontal'][size='medium'])::part(indicator-placeholder) {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }
  :host([aria-selected='true']):host-context([orientation='horizontal'][size='large'])::part(indicator-placeholder) {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }
  :host([aria-selected='true']):host-context([orientation='vertical'][size='small'])::part(indicator-placeholder) {
    top: ${spacingVerticalSNudge};
    bottom: ${spacingVerticalSNudge};
  }
  :host([aria-selected='true']):host-context([orientation='vertical'][size='medium'])::part(indicator-placeholder) {
    top: ${spacingVerticalMNudge};
    bottom: ${spacingVerticalMNudge};
  }
  :host([aria-selected='true']):host-context([orientation='vertical'][size='large'])::part(indicator-placeholder) {
    top: ${spacingVerticalL};
    bottom: ${spacingVerticalL};
  }

  :host([aria-selected='true'])::after {
    background-color: ${colorCompoundBrandStroke};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    z-index: 2;
  }

  :host([aria-selected='false']:hover)::after {
    background-color: ${colorNeutralStroke1Hover};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
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

  :host([disabled]:hover)::after {
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
    box-shadow: 0 0 0 2pt ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }
`;
