import { css } from '@microsoft/fast-element';
import { colorNeutralStroke1, strokeWidthThin } from '../theme/design-tokens.js';

/** Divider styles
 * @public
 */
export const styles = css`
  :host {
    border: none;
    display: flex;
  }
  :host [divider-background] {
    display: flex;
    background: red;
  }

  :host([orientation='horizontal']) {
    flex-direction: column;
  }
  :host([orientation='horizontal']) ::slotted(*) {
  }

  :host([orientation='vertical']) {
    flex-direction: row;
  }
  :host([orientation='vertical']) ::slotted(*) {
    flex-direction: row;
  }

  :host ::slotted(*) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  :host([align-content='start']) {
    align-items: flex-start;
  }
  :host([align-content='center']) {
    align-items: center;
  }
  :host([align-content='end']) {
    align-items: flex-end;
  }

  :host ::slotted(*)::before,
  :host ::slotted(*)::after {
    align-self: center;
    content: '';
    height: 1px;
    flex: 1;
    margin: 0 1em;
    background: #ddd;
  }

  :host([appearance='strong']) ::slotted(*)::after,
  :host([appearance='strong']) ::slotted(*)::before {
    background: #000000;
  }
  :host([appearance='brand']) ::slotted(*)::after,
  :host([appearance='brand']) ::slotted(*)::before {
    background: blue;
  }
  :host([appearance='subtle']) ::slotted(*)::after,
  :host([appearance='subtle']) ::slotted(*)::before {
    background: #ececec;
  }
`;
