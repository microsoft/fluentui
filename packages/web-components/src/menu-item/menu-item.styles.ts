import { css } from '@microsoft/fast-element';
import { checkedState, disabledState, submenuState } from '../styles/states/index.js';
import {
  borderRadiusMedium,
  colorCompoundBrandForeground1Pressed,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Selected,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground2,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorStrokeFocus2,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/** MenuItem styles
 * @public
 */
export const styles = css`
  ${display('grid')}

  :host {
    align-items: center;
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    color: ${colorNeutralForeground2};
    cursor: pointer;
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
    grid-template-columns: subgrid;
    height: 32px;
    overflow: visible;
  }

  :host(:hover) {
    background: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(:active) {
    background-color: ${colorNeutralBackground1Selected};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(:active) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Pressed};
  }

  :host(${disabledState}) {
    background-color: ${colorNeutralBackgroundDisabled};
    color: ${colorNeutralForegroundDisabled};
  }

  :host(${disabledState}) ::slotted([slot='start']),
  :host(${disabledState}) ::slotted([slot='end']) {
    color: ${colorNeutralForegroundDisabled};
  }

  :host(:focus-visible) {
    border-radius: ${borderRadiusMedium};
    outline: 2px solid ${colorStrokeFocus2};
  }

  .content {
    white-space: nowrap;
    flex-grow: 1;
    grid-column: auto / span 2;
    padding: 0 2px;
  }

  :host(:not(${checkedState})) .indicator,
  :host(:not(${checkedState})) ::slotted([slot='indicator']),
  :host(:not(${submenuState})) .submenu-glyph,
  :host(:not(${submenuState})) ::slotted([slot='submenu-glyph']) {
    display: none;
  }

  ::slotted([slot='end']) {
    color: ${colorNeutralForeground3};
    font: ${fontWeightRegular} ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};
    white-space: nowrap;
  }

  .indicator,
  ::slotted([slot='indicator']) {
    grid-column: 2 / span 1;
    width: 20px;
  }

  ::slotted([slot='start']) {
    display: inline-flex;
    grid-column: 3 / span 1;
  }

  .content {
    grid-column: 4 / span 1;
  }

  ::slotted([slot='end']) {
    grid-column: 5 / span 1;
    justify-self: end;
  }

  .submenu-glyph,
  ::slotted([slot='submenu-glyph']) {
    grid-column: 6 / span 1;
    justify-self: end;
  }

  @layer popover {
    :host {
      anchor-name: --menu-trigger;
      position: relative;
    }

    @position-try --inline-inside {
      inset-inline-start: unset;
      inset-inline-end: anchor(inside);
    }

    ::slotted([popover]) {
      margin: 0;
      max-height: var(--menu-max-height, auto);
      position: fixed;
      position-anchor: --menu-trigger;
      inset: unset;
      inset-block-start: anchor(inside);
      inset-inline-start: anchor(outside);
      position-try-fallbacks: --inline-inside, flip-block, flip-block --inline-inside;
      z-index: 1;
    }

    ::slotted([popover]:not(:popover-open)) {
      display: none;
    }

    /* Fallback for no anchor-positioning */
    @supports not (anchor-name: --menu-trigger) {
      ::slotted([popover]) {
        align-self: start;
      }
    }
  }

  @media (forced-colors: active) {
    :host(${disabledState}),
    :host(${disabledState}) ::slotted([slot='start']),
    :host(${disabledState}) ::slotted([slot='end']) {
      color: GrayText;
    }
  }
`;
