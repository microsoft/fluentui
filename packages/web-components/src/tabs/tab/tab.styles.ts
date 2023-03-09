import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandStroke,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1Hover,
  colorTransparentStroke,
  curveDecelerateMax,
  durationSlow,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightBold,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  strokeWidthThicker,
} from '../../theme/design-tokens.js';
import { TAB_TOKEN_NAMES } from './tab.js';

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

  :host::after {
    /* default size and color */
    width: calc(100% - 20px);
    height: ${strokeWidthThicker};
    background-color: ${colorTransparentStroke};
    border-radius: ${borderRadiusCircular};

    /* default values for content, position and margin */
    content: '';
    inset: 0;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    z-index: 1;
  }

  :host(.animated)::after {
    /* animations */
    transition-property: transform;
    transition-duration: ${durationSlow};
    transition-timing-function: ${curveDecelerateMax};
  }

  :host(.horizontal)::after {
    transform-origin: left;
    transform: translateX(var(${TAB_TOKEN_NAMES.tabIndicatorOffset})) scaleX(var(${TAB_TOKEN_NAMES.tabIndicatorScale}));
  }
  :host(.vertical)::after {
    transform-origin: top;
    transform: translateY(var(${TAB_TOKEN_NAMES.tabIndicatorOffset})) scaleX(var(${TAB_TOKEN_NAMES.tabIndicatorScale}));
  }

  :host([data-selected='true'])::after {
    background-color: ${colorCompoundBrandStroke};
  }

  :host([data-selected='false']:hover)::before {
    /* default size and color */
    width: calc(100% - 20px);
    height: ${strokeWidthThicker};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    margin-top: auto;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;
    background-color: ${colorNeutralStroke1Hover};
  }

  :host([data-selected='true'][disabled])::after {
    background-color: ${colorNeutralForegroundDisabled};
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
    color: none;
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
  :host(.vertical) {
    justify-content: start;
    grid-column: 2;
  }
  :host(.vertical[aria-selected='true']) {
    z-index: 2;
  }

  :host(:focus-visible) {
    border-radius: ${borderRadiusSmall};
    box-shadow: 0 0 0 2pt ${colorNeutralForeground1};
    outline: none;
  }
`;
