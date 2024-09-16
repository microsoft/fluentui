import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';

/** Menu styles
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  ::slotted([slot='trigger']) {
    anchor-name: --menu-trigger;
  }

  ::slotted([popover]) {
    inset-area: block-end span-inline-end;
    margin: 0;
    max-height: var(--menu-max-height, auto);
    position-anchor: --menu-trigger;
    position-try-options: flip-block;
    position: absolute;
    z-index: 1;
  }

  ::slotted([popover]:popover-open) {
    inset: unset;
  }

  ::slotted([popover]:not(:popover-open)) {
    display: none;
  }
`;
