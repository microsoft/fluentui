import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  borderRadiusMedium,
  colorCompoundBrandForeground1Hover,
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

/** MenuItem styles
 * @public
 */
export const styles = css`
  ${display('grid')}

  :host {
    --indent: 0;
    grid-template-columns: 20px 20px auto 20px;
    align-items: center;
    grid-gap: 4px;
    height: 32px;
    background: ${colorNeutralBackground1};
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
    border-radius: ${borderRadiusMedium};
    color: ${colorNeutralForeground2};
    padding: 0 10px;
    cursor: pointer;
    overflow: visible;
    contain: layout;
  }

  :host(:hover) {
    background: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground2Hover};
  }

  :host([icon]:hover) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Hover};
  }

  :host(:active) {
    background-color: ${colorNeutralBackground1Selected};
    color: ${colorNeutralForeground2Pressed};
  }

  :host([icon]:active) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Pressed};
  }

  :host([disabled]) {
    background-color: ${colorNeutralBackgroundDisabled};
    color: ${colorNeutralForegroundDisabled};
  }

  :host([disabled]) ::slotted([slot='end']) {
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

  :host(:not([checked])) .indicator,
  :host(:not([checked])) ::slotted([slot='indicator']),
  :host(:not([aria-haspopup='menu'])) .submenu-glyph,
  :host(:not([aria-haspopup='menu'])) ::slotted([slot='submenu-glyph']){
    display: none;
  }

  ::slotted([slot='end']) {
    color: ${colorNeutralForeground3};
    font: ${fontWeightRegular} ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};
    white-space: nowrap;
  }

  :host([data-indent='1']) {
    --indent: 1;
  }

  :host([data-indent='2']) {
    --indent: 2;
    grid-template-columns: 20px 20px auto auto;
  }

  :host([aria-haspopup='menu']) {
    grid-template-columns: 20px auto auto 20px;
  }

  :host([data-indent='2'][aria-haspopup='menu']) {
    grid-template-columns: 20px 20px auto auto 20px;
  }

  .indicator,
  ::slotted([slot='indicator']) {
    grid-column: 1 / span 1;
    width: 20px;
  }

  ::slotted([slot='start']) {
    display: inline-flex;
    grid-column: calc(var(--indent)) / span 1;
  }

  .content {
    grid-column: calc(var(--indent) + 1) / span 1;
  }

  ::slotted([slot='end']) {
    grid-column: calc(var(--indent) + 2) / span 1;
    justify-self: end;
  }

  .submenu-glyph,
  ::slotted([slot='submenu-glyph']) {
    grid-column: -2 / span 1;
    justify-self: end;
  }

  @layer popover {
    :host {
      position: relative;
      anchor-name: --menu-trigger;
      container-name: menuitem
      container-type: inline-size;
    }

    ::slotted([popover]) {
      inset-area: inline-end span-block-end;
      margin: 0;
      max-height: var(--menu-max-height, auto);
      position-anchor: --menu-trigger;
      position-try-options: flip-inline;
      position: absolute;
      z-index: 1;
    }

    ::slotted([popover]:not(:popover-open)) {
      display: none;
    }

    ::slotted([popover]:popover-open) {
      inset: unset;
    }

    @supports not (anchor-name: --anchor) {
      ::slotted([popover]:popover-open) {
        translate: var(--menu-item-width, 0) 0;
      }
    }
  }
`;
