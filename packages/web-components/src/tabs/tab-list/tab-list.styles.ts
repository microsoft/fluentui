import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorBrandBackgroundSelected,
  colorNeutralForeground2,
  fontFamilyBase,
  fontSizeBase300,
  lineHeightBase300,
  spacingHorizontalL,
  spacingHorizontalMNudge,
} from '../../theme/design-tokens.js';

export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    --tabActiveIndicator: ${colorBrandBackgroundSelected};

    display: grid;
    box-sizing: border-box;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground2};
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr;
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
    height: 5px;
    justify-self: center;
    background: var(--tabActiveIndicator);
    border-radius: ${borderRadiusMedium};
    margin-bottom: ${spacingHorizontalMNudge};
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
    padding: 0 calc(var(--design-unit) * 4px) calc((var(--height-number) - var(--design-unit)) * 1px) 0;
  }
  :host([orientation='vertical']) .tabpanel {
    grid-column: 2;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  :host([orientation='vertical']) ::slotted([slot='end']) {
    grid-row: 3;
  }
  :host([orientation='vertical']) .activeIndicator {
    grid-column: 1;
    grid-row: 1;
    width: 5px;
    height: 100%;
    margin-inline-end: 10px;
    align-self: center;
    background: var(--accent-fill-rest);
    margin-top: 0;
    border-radius: 0 calc(var(--control-corner-radius) * 1px) calc(var(--control-corner-radius) * 1px) 0;
  }
  :host([orientation='vertical']) .activeIndicatorTransition {
    transition: transform 0.2s linear;
  }
`;
