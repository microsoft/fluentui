import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
import { colorNeutralStroke1, strokeWidthThin } from '../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  ::slotted([slot='trigger']) {
    anchor-name: --menu-trigger;
  }

  ::slotted([popover]) {
    margin: 0;
    max-height: var(--menu-max-height, auto);
    position-anchor: --menu-trigger;
    inset: unset;
    inset-block-start: anchor(outside);
    inset-inline-start: anchor(self-start);
    position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
    position: fixed;
    z-index: 1;
  }

  :host([split]) ::slotted([popover]) {
    inset-inline-start: unset;
    inset-inline-end: anchor(self-end);
  }

  ::slotted([popover]:not(:popover-open)) {
    display: none;
  }

  :host([split]) {
    display: inline-flex;
  }

  :host([split]) ::slotted([slot='primary-action']) {
    border-inline-end: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  /* Keeps focus visible visuals above trigger slot*/
  :host([split]) ::slotted([slot='primary-action']:focus-visible) {
    z-index: 1;
  }

  :host([split]) ::slotted([slot='primary-action'][appearance='primary']) {
    border-inline-end: ${strokeWidthThin} solid white;
  }

  :host([split]) ::slotted([slot='trigger']) {
    border-inline-start: 0;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
`;
