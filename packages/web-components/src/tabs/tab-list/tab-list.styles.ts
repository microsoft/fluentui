import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorBrandBackgroundSelected,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalSNudge,
} from '../../theme/design-tokens.js';

export const styles = css`
  :host {
    display: grid;
    box-sizing: border-box;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground2};
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr;
    fill: green;
  }

  :host([hidden]) {
    display: none;
  }

  :host([disabled='true']) {
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled='true']) .active-indicator {
    background: ${colorNeutralForegroundDisabled};
  }

  .tablist {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    position: relative;
    width: max-content;
    align-self: end;
    box-sizing: border-box;
  }
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
    align-self: center;
  }
  ::slotted([slot='start']) {
    margin-inline-end: 11px;
  }
  ::slotted([slot='end']) {
    margin-inline-start: 11px;
  }
  .active-indicator {
    grid-row: 2;
    grid-column: 1;
    width: 100%;
    height: 3px;
    justify-self: center;
    background: ${colorBrandBackgroundSelected};
    border-radius: ${borderRadiusMedium};
    position: relative;
  }
  .activeIndicatorTransition {
    transition: transform 0.2s ease;
  }

  .tabpanel {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 4;
    position: relative;
  }
  :host([orientation='vertical']) {
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
  }
  :host([orientation='vertical']) .tablist {
    grid-row-start: 2;
    grid-row-end: 2;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 1fr;
    position: relative;
    width: max-content;
    justify-self: end;
    align-self: flex-start;
    width: 100%;
  }
  :host([orientation='vertical']) .tabpanel {
    grid-column: 2;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  :host([orientation='vertical']) ::slotted([slot='end']) {
    grid-row: 3;
  }
  :host([orientation='vertical']) .active-indicator {
    grid-column: 1;
    grid-row: 1;
    width: 3px;
    height: ${fontSizeBase300};
    align-self: center;
    border-radius: ${borderRadiusMedium};
  }
  :host([orientation='vertical']) .activeIndicatorTransition {
    transition: transform 0.2s linear;
  }

  :host([size='small']) ::slotted(fluent-tab) {
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    padding-top: ${spacingVerticalSNudge};
    padding-bottom: ${spacingVerticalSNudge};
    padding-left: ${spacingHorizontalSNudge};
    padding-right: ${spacingHorizontalSNudge};
    border-radius: ${borderRadiusMedium};
  }

  :host([size='large']) ::slotted(fluent-tab) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    padding-top: ${spacingVerticalL};
    padding-bottom: ${spacingVerticalL};
    padding-left: ${spacingHorizontalMNudge};
    padding-right: ${spacingHorizontalMNudge};
    border-radius: ${borderRadiusMedium};
  }

  :host([reserve-selected-tab-space='true']) ::slotted(fluent-tab) {
    font-weight: ${fontWeightRegular};
  }
`;
