import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStroke,
  shadow16,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/** MenuList styles
 * @public
 */
export const styles = css`
  ${display('grid')}

  :host {
    --_col-indicator-width: 0px;
    --_col-start-width: 0px;
    --_col-content-width: 1fr;
    --_col-end-width: 0px;
    --_col-submenu-width: 0px;

    contain: layout style;
    block-size: auto;
    max-inline-size: 300px;
    min-inline-size: 160px;
    inline-size: auto;
    background-color: ${colorNeutralBackground1};
    border: 1px solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    box-shadow: ${shadow16};
    grid-template-columns:
      10px
      var(--_col-indicator-width)
      var(--_col-start-width)
      var(--_col-content-width)
      var(--_col-end-width)
      var(--_col-submenu-width)
      10px;
    gap: 2px 0;
    padding: 4px;
  }

  ::slotted(*) {
    grid-column: 1 / -1;
  }

  :host([data-has-indicator]) {
    --_col-indicator-width: 24px;
  }

  :host([data-has-start]) {
    --_col-start-width: 24px;
  }

  :host([data-has-end]) {
    --_col-end-width: 24px;
  }

  :host([data-has-submenu]) {
    --_col-submenu-width: 24px;
  }
`;
