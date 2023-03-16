import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralForeground1,
  colorNeutralForeground1Hover,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  curveDecelerateMax,
  durationSlow,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalL,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalMNudge,
  spacingVerticalSNudge,
  strokeWidthThicker,
} from '../theme/design-tokens.js';
import { TabTokenNames } from './tabs.js';

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
  }

  :host([disabled]) {
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled} !important;
  }

  :host([disabled]) ::slotted(fluent-tab) {
    pointer-events: none;
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled} !important;
  }
  :host([disabled]) ::slotted(fluent-tab:after) {
    background-color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) ::slotted(fluent-tab[aria-selected='true'])::after {
    background-color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) ::slotted(fluent-tab:hover):before {
    content: unset;
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

  // TODO: remove active-indicator styling when FAST Pr to remove active indicator is completed.
  .active-indicator {
    display: none;
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

  :host ::slotted(fluent-tab.animated)::after {
    transition-property: transform;
    transition-duration: ${durationSlow};
    transition-timing-function: ${curveDecelerateMax};
  }
  :host ::slotted(fluent-tab:active) {
    color: ${colorNeutralForeground1};
    fill: ${colorNeutralForeground1};
  }
  :host([appearance='subtle']) ::slotted(fluent-tab) {
    background-color: ${colorSubtleBackground};
    color: ${colorNeutralForeground1};
  }
  :host([appearance='subtle']) ::slotted(fluent-tab:active) {
    background-color: ${colorSubtleBackgroundPressed};
  }
  :host([appearance='subtle']) ::slotted(fluent-tab:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground1Hover};
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

  :host([orientation='horizontal']) ::slotted(fluent-tab)::after {
    height: ${strokeWidthThicker};
    margin-top: auto;
    transform-origin: left;
    transform: translateX(var(${TabTokenNames.tabIndicatorOffset})) scaleX(var(${TabTokenNames.tabIndicatorScale}));
  }
  :host([orientation='horizontal']) ::slotted(fluent-tab:hover):before {
    height: ${strokeWidthThicker};
    margin-top: auto;
    transform-origin: left;
  }

  :host([orientation='horizontal'][size='small']) ::slotted(fluent-tab)::after {
    right: ${spacingHorizontalSNudge};
    left: ${spacingHorizontalSNudge};
  }
  :host([orientation='horizontal'][size='small']) ::slotted(fluent-tab:hover)::before {
    right: ${spacingHorizontalSNudge};
    left: ${spacingHorizontalSNudge};
  }

  :host([orientation='horizontal'][size='medium']) ::slotted(fluent-tab)::after {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }
  :host([orientation='horizontal'][size='medium']) ::slotted(fluent-tab:hover):before {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }

  :host([orientation='horizontal'][size='large']) ::slotted(fluent-tab)::after {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }
  :host([orientation='horizontal'][size='large']) ::slotted(fluent-tab:hover)::before {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }

  :host([orientation='vertical']) ::slotted(fluent-tab) {
    justify-content: start;
    grid-column: 2;
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::after {
    width: ${strokeWidthThicker};
    margin-right: auto;
    transform-origin: top;
    transform: translateY(var(${TabTokenNames.tabIndicatorOffset})) scaleY(var(${TabTokenNames.tabIndicatorScale}));
  }
  :host([orientation='vertical']) ::slotted(fluent-tab:hover):before {
    width: ${strokeWidthThicker};
    margin-right: auto;
    transform-origin: top;
  }

  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::after {
    top: ${spacingVerticalSNudge};
    bottom: ${spacingVerticalSNudge};
  }
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab:hover):before {
    top: ${spacingVerticalSNudge};
    bottom: ${spacingVerticalSNudge};
  }

  :host([orientation='vertical'][size='medium']) ::slotted(fluent-tab)::after {
    top: ${spacingVerticalMNudge};
    bottom: ${spacingVerticalMNudge};
  }
  :host([orientation='vertical'][size='medium']) ::slotted(fluent-tab:hover):before {
    top: ${spacingVerticalMNudge};
    bottom: ${spacingVerticalMNudge};
  }

  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::after {
    top: ${spacingVerticalL};
    bottom: ${spacingHorizontalL};
  }
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab:hover):before {
    top: ${spacingVerticalL};
    bottom: ${spacingHorizontalL};
  }
`;
