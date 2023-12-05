import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorCompoundBrandForeground1Hover,
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

export const styles = css`
  ${display('grid')}

  :host {
    box-sizing: border-box;
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
    color: var(${colorNeutralForeground2});
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto 1fr;
  }

  :host([disabled]) {
    cursor: not-allowed;
    color: var(${colorNeutralForegroundDisabled});
  }

  :host([disabled]) ::slotted(fluent-tab) {
    pointer-events: none;
    cursor: not-allowed;
    color: var(${colorNeutralForegroundDisabled});
  }
  :host([disabled]) ::slotted(fluent-tab:after) {
    background-color: var(${colorNeutralForegroundDisabled});
  }
  :host([disabled]) ::slotted(fluent-tab[aria-selected='true'])::after {
    background-color: var(${colorNeutralForegroundDisabled});
  }
  :host([disabled]) ::slotted(fluent-tab:hover):before {
    content: unset;
  }

  :host ::slotted(fluent-tab) {
    border-radius: var(${borderRadiusMedium});
  }

  :host ::slotted(fluent-tab[aria-selected='true'])::before {
    background-color: var(${colorNeutralForegroundDisabled});
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
    background-color: var(${colorSubtleBackgroundHover});
    color: var(${colorNeutralForeground1Hover});
    fill: var(${colorCompoundBrandForeground1Hover});
  }

  :host([appearance='subtle']) ::slotted(fluent-tab:active) {
    background-color: var(${colorSubtleBackgroundPressed});
    fill: var(${colorSubtleBackgroundPressed});
    color: var(${colorNeutralForeground1});
  }

  :host([size='small']) ::slotted(fluent-tab) {
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
    padding: var(${spacingVerticalSNudge}) var(${spacingHorizontalSNudge});
  }

  :host([size='large']) ::slotted(fluent-tab) {
    font-size: var(${fontSizeBase400});
    line-height: var(${lineHeightBase400});
    padding: var(${spacingVerticalL}) var(${spacingHorizontalMNudge});
  }

  /* indicator animation  */
  :host ::slotted(fluent-tab[data-animate='true'])::after {
    transition-property: transform;
    transition-duration: var(${durationSlow});
    transition-timing-function: var(${curveDecelerateMax});
  }
  :host ::slotted(fluent-tab)::after {
    height: var(${strokeWidthThicker});
    margin-top: auto;
    transform-origin: left;
    transform: translateX(var(--tabIndicatorOffset)) scaleX(var(--tabIndicatorScale));
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::after {
    width: var(${strokeWidthThicker});
    height: unset;
    margin-top: unset;
    transform-origin: top;
    transform: translateY(var(--tabIndicatorOffset)) scaleY(var(--tabIndicatorScale));
  }

  /* ::before adds a secondary indicator placeholder that appears right after click on the active tab */
  :host ::slotted(fluent-tab)::before {
    height: var(${strokeWidthThicker});
    border-radius: var(${borderRadiusCircular});
    content: '';
    inset: 0;
    position: absolute;
    margin-top: auto;
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::before {
    height: unset;
    width: var(${strokeWidthThicker});
    margin-inline-end: auto;
    transform-origin: top;
  }

  :host ::slotted(fluent-tab[aria-selected='false']:hover)::after {
    height: var(${strokeWidthThicker});
    margin-top: auto;
    transform-origin: left;
  }
  :host([orientation='vertical']) ::slotted(fluent-tab[aria-selected='false']:hover)::after {
    height: unset;
    margin-inline-end: auto;
    transform-origin: top;
    width: var(${strokeWidthThicker});
  }

  :host([orientation='vertical']) ::slotted(fluent-tab) {
    align-items: flex-start;
    grid-column: 2;
    padding-top: var(${spacingVerticalSNudge});
    padding-bottom: var(${spacingVerticalSNudge});
  }
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab) {
    padding-top: var(${spacingVerticalXXS});
    padding-bottom: var(${spacingVerticalXXS});
  }
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab) {
    padding-top: var(${spacingVerticalS});
    padding-bottom: var(${spacingVerticalS});
  }

  /* horizontal spacing for indicator */
  :host([size='small']) ::slotted(fluent-tab)::after,
  :host([size='small']) ::slotted(fluent-tab)::before,
  :host([size='small']) ::slotted(fluent-tab:hover)::after {
    right: var(${spacingHorizontalSNudge});
    left: var(${spacingHorizontalSNudge});
  }
  :host ::slotted(fluent-tab)::after,
  :host ::slotted(fluent-tab)::before,
  :host ::slotted(fluent-tab:hover)::after {
    right: var(${spacingHorizontalMNudge});
    left: var(${spacingHorizontalMNudge});
  }
  :host([size='large']) ::slotted(fluent-tab)::after,
  :host([size='large']) ::slotted(fluent-tab)::before,
  :host([size='large']) ::slotted(fluent-tab:hover)::after {
    right: var(${spacingHorizontalMNudge});
    left: var(${spacingHorizontalMNudge});
  }

  /* vertical spacing for indicator */
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::after,
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab)::before,
  :host([orientation='vertical'][size='small']) ::slotted(fluent-tab:hover)::after {
    right: 0;
    left: 0;
    top: var(${spacingVerticalSNudge});
    bottom: var(${spacingVerticalSNudge});
  }
  :host([orientation='vertical']) ::slotted(fluent-tab)::after,
  :host([orientation='vertical']) ::slotted(fluent-tab)::before,
  :host([orientation='vertical']) ::slotted(fluent-tab:hover)::after {
    right: 0;
    left: 0;
    top: var(${spacingVerticalS});
    bottom: var(${spacingVerticalS});
  }
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::after,
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab)::before,
  :host([orientation='vertical'][size='large']) ::slotted(fluent-tab:hover)::after {
    right: 0;
    left: 0;
    top: var(${spacingVerticalMNudge});
    bottom: var(${spacingVerticalMNudge});
  }
`;
