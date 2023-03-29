import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorNeutralForeground1,
  colorNeutralForeground1Hover,
  colorNeutralForeground2,
  colorNeutralForegroundDisabled,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  curveDecelerateMax,
  durationSlow,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase400,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingVerticalL,
  spacingVerticalMNudge,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXXS,
  strokeWidthThicker,
} from '../theme/design-tokens.js';
import { TabTokenNames } from './tabs.js';

export const styles = css`
  ${display('grid')}

  :host {
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
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]) ::slotted(fluent-tab) {
    pointer-events: none;
    cursor: not-allowed;
    color: ${colorNeutralForegroundDisabled};
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

  :host([appearance='subtle']) ::slotted(fluent-tab:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground1Hover};
  }

  :host([appearance='subtle']) ::slotted(fluent-tab:active) {
    background-color: ${colorSubtleBackgroundPressed};
    fill: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground1};
  }

  :host ::slotted(fluent-tab.animated)::after {
    transition-property: transform;
    transition-duration: ${durationSlow};
    transition-timing-function: ${curveDecelerateMax};
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

  /* ::after adds the active indicator  */
  :host([orientation='horizontal']) ::slotted(fluent-tab)::after {
    height: ${strokeWidthThicker};
    margin-top: auto;
    transform-origin: left;
    transform: translateX(var(${TabTokenNames.tabIndicatorOffset})) scaleX(var(${TabTokenNames.tabIndicatorScale}));
  }
  /* ::before adds a secondary indicator placeholder that appears right after click on the active tab */
  :host ::slotted(fluent-tab)::before {
    height: ${strokeWidthThicker};
    border-radius: ${borderRadiusCircular};
    content: '';
    inset: 0;
    position: absolute;
    margin-top: auto;
  }

  :host([orientation='horizontal']) ::slotted(fluent-tab[aria-selected='false']:hover)::after {
    height: ${strokeWidthThicker};
    margin-top: auto;
    transform-origin: left;
  }

  :host ::slotted(fluent-tab[aria-selected='true'])::before {
    background-color: ${colorNeutralForegroundDisabled};
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::before {
    height: unset;
    width: ${strokeWidthThicker};
    margin-inline-end: auto;
    transform-origin: top;
  }

  :host([orientation='horizontal'][size='small']) ::slotted(fluent-tab)::after,
  :host([orientation='horizontal'][size='small']) ::slotted(fluent-tab)::before,
  :host([orientation='horizontal'][size='small']) ::slotted(fluent-tab:hover)::after {
    right: ${spacingHorizontalSNudge};
    left: ${spacingHorizontalSNudge};
  }
  :host([orientation='horizontal']) ::slotted(fluent-tab)::after,
  :host([orientation='horizontal']) ::slotted(fluent-tab)::before,
  :host([orientation='horizontal']) ::slotted(fluent-tab:hover)::after {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }
  :host([orientation='horizontal'][size='large']) ::slotted(fluent-tab)::after,
  :host([orientation='horizontal'][size='large']) ::slotted(fluent-tab)::before,
  :host([orientation='horizontal'][size='large']) ::slotted(fluent-tab:hover)::after {
    right: ${spacingHorizontalMNudge};
    left: ${spacingHorizontalMNudge};
  }
  :host([orientation='vertical']) ::slotted(fluent-tab) {
    align-items: flex-start;
    grid-column: 2;
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::after {
    width: ${strokeWidthThicker};
    margin-right: auto;
    transform-origin: top;
    transform: translateY(var(${TabTokenNames.tabIndicatorOffset})) scaleY(var(${TabTokenNames.tabIndicatorScale}));
  }
  :host([orientation='vertical']) ::slotted(fluent-tab:hover)::after {
    width: ${strokeWidthThicker};
    margin-right: auto;
    transform-origin: top;
  }

  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab) {
    padding-top: ${spacingVerticalXXS};
    padding-bottom: ${spacingVerticalXXS};
  }
  :host([orientation='vertical']) ::slotted(fluent-tab) {
    padding-top: ${spacingVerticalSNudge};
    padding-bottom: ${spacingVerticalSNudge};
  }
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab) {
    padding-top: ${spacingVerticalS};
    padding-bottom: ${spacingVerticalS};
  }

  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::after,
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::before,
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab:hover)::after {
    top: ${spacingVerticalSNudge};
    bottom: ${spacingVerticalSNudge};
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::after,
  :host([orientation='vertical']) ::slotted(fluent-tab)::before,
  :host([orientation='vertical']) ::slotted(fluent-tab:hover)::after {
    top: ${spacingVerticalS};
    bottom: ${spacingVerticalS};
  }
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::after,
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::before,
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab:hover)::after {
    top: ${spacingVerticalMNudge};
    bottom: ${spacingVerticalMNudge};
  }
`;
