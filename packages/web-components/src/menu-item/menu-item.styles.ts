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
  fontSizeBase500,
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
    --indent: 0;
  }

  :host(:hover) {
    background: ${colorNeutralBackground1Hover};
  }

  :host(:focus-visible) {
    border-radius: ${borderRadiusMedium};
    outline: 2px solid ${colorStrokeFocus2};
  }

  .indicator {
    width: 20px;
  }

  .content {
    white-space: nowrap;
    flex-grow: 1;
    grid-column: auto / span 2;
    padding: 0 2px;
  }

  .indicator,
  .submenu-glyph,
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: ${colorNeutralForeground2};
  }

  .submenu-glyph,
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    height: 32px;
    font-size: ${fontSizeBase500};
    width: fit-content;
  }

  :host(:not([aria-haspopup='menu'])) .submenu-glyph {
    display: none;
  }

  ::slotted([slot='end']) {
    color: ${colorNeutralForeground3};
    font: ${fontWeightRegular} ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};
    white-space: nowrap;
    grid-column: 4 / span 1;
    justify-self: flex-end;
  }

  :host(:not([checked])) .indicator {
    display: none;
  }

  :host(:hover) .indicator,
  :host(:hover) .submenu-glyph,
  :host(:hover) .content {
    color: ${colorNeutralForeground2Hover};
  }

  :host([icon]:hover) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Hover};
  }

  :host(:active) {
    background-color: ${colorNeutralBackground1Selected};
  }

  :host(:active) .indicator,
  :host(:active) .submenu-glyph,
  :host(:active) .content {
    color: ${colorNeutralForeground2Pressed};
  }

  :host(:active) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Pressed};
  }

  :host([disabled]) {
    background-color: ${colorNeutralBackgroundDisabled};
  }

  :host([disabled]) .content,
  :host([disabled]) .submenu-glyph,
  :host([disabled]) ::slotted([slot='end']),
  :host([disabled]) ::slotted([slot='start']) {
    color: ${colorNeutralForegroundDisabled};
  }

  :host([data-indent]) {
    display: grid;
  }

  :host([data-indent='1']) {
    --indent: 1;
  }

  :host([data-indent='2']) {
    --indent: 2;
    display: grid;
    grid-template-columns: 20px 20px auto auto;
  }

  :host([aria-haspopup='menu']) {
    grid-template-columns: 20px auto auto 20px;
  }

  :host([data-indent='2'][aria-haspopup='menu']) {
    grid-template-columns: 20px 20px auto auto 20px;
  }

  .indicator {
    grid-column: 1 / span 1;
  }

  ::slotted([slot='start']) {
    grid-column: calc(var(--indent)) / span 1;
  }

  .content {
    grid-column: calc(var(--indent) + 1) / span 1;
  }

  ::slotted([slot='end']) {
    grid-column: calc(var(--indent) + 3) / span 1;
    justify-self: end;
  }

  .submenu-glyph {
    grid-column: calc(var(--indent) + 4) / span 1;
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
