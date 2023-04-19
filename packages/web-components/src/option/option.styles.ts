import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  fontFamilyBase,
  fontFamilyBase,
  fontSizeBase300,
  lineHeightBase300,
} from '../theme/design-tokens.js';

/** Option styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}
  :host {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    flex: 0 0 auto;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    height: 32px;
    line-height: ${lineHeightBase300};
    outline: none;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
  }
  :host([hidden]) {
    display: none;
  }
  :host(:focus-visible) {
  }
  :host([aria-selected='true']) {
  }
  :host(:hover) {
  }
  :host(:active) {
  }
  :host(:not([aria-selected='true']):hover),
  :host(:not([aria-selected='true']):active) {
  }
  :host([disabled]) {
  }
  :host([disabled]:hover) {
  }
  .content {
    grid-column-start: 2;
    justify-self: start;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: flex;
  }
  ::slotted([slot='start']) {
  }
  ::slotted([slot='end']) {
  }
  :host([aria-checked='true'][aria-selected='false']) {
  }
  :host([aria-checked='true'][aria-selected='false']:not([disabled]):hover) {
  }
  :host([aria-checked='true'][aria-selected='true']) {
  }
  :host([aria-checked='true'][aria-selected='true']:hover) {
  }
`;
