import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralBackground1,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1,
  colorNeutralStrokeDisabled,
  colorStrokeFocus1,
  fontSizeBase300,
  lineHeightBase300,
  shadow2,
} from '../theme/design-tokens.js';

/** Dropdown styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}
  :host {
    --elevation: 14;
    background: ${colorNeutralBackground1};
    border-radius: 5px;
    border: 1px solid black;
    box-sizing: border-box;
    color: var(--neutral-foreground-rest);
    font-family: var(--body-font);
    height: 30px;
    position: relative;
    user-select: none;
    min-width: 250px;
    outline: none;
    vertical-align: top;
}
:host(:not([aria-haspopup])) {
    --elevation: 0;
    border: 0;
    height: auto;
    min-width: 0;
}
.listbox {
    background: ${colorNeutralBackground1};
    border: none;
    border-radius:5px
    box-shadow: var(--elevation-shadow);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 5px;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}
:host([size="0"]) .listbox {
    max-height: none;
}
.control + .listbox {
    
    max-height: 300px
}
:host(:not([aria-haspopup])) .listbox {
    left: auto;
    position: static;
    z-index: auto;
}
.listbox[hidden] {
    display: none;
}
.control {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    font-size: ${fontSizeBase300};
    font-family: inherit;
    line-height: ${lineHeightBase300};
    min-height: 100%;
    padding: 5px;
    width: 100%;
}
:host(:not([disabled]):hover) {
    background: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
}
:host(:focus-visible) {
    border-color: ${colorStrokeFocus1};
}
:host(:not([size]):not([multiple]):not([open]):focus-visible),
:host([multiple]:focus-visible),
:host([size]:focus-visible) {
    box-shadow: ${shadow2};
}
:host(:not([multiple]):not([size]):focus-visible)
    ::slotted(fast-option[aria-selected="true"]:not([disabled])) {
      
    border-color: ${colorNeutralStroke1};
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
}
:host([disabled]) {
    cursor: auto;
}
:host([disabled]) .control {
  cursor: auto;
  user-select: none;
}
:host([disabled]:hover) {
    background: ${colorNeutralBackgroundDisabled};
    color: ${colorNeutralForegroundDisabled};
    fill: currentcolor;
}
:host(:not([disabled])) .control:active {
  background: ${colorNeutralBackgroundDisabled};
  border-color: ${colorNeutralStrokeDisabled};
  border-radius: 5px;
}
:host([open][position="above"]) .listbox {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
    bottom: 1px;
}
:host([open][position="below"]) .listbox {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 0;
    top: 1px
}
.selected-value {
    flex: 1 1 auto;
    font-family: inherit;
    min-width: 200px;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.indicator {
    flex: 0 0 auto;
    margin-inline-start: 1em;
    width: 8px;
    height: 8px;
    background: black;
}
slot[name="listbox"] {
    display: none;
    width: 100%;
}
:host([open]) slot[name="listbox"] {
    display: flex;
    position: absolute;
    box-shadow: var(--elevation-shadow);
}
::slotted([slot="start"]),
::slotted([slot="end"]) {
    display: flex;
}
::slotted([slot="start"]) {
    margin-inline-end: 11px;
}
::slotted([slot="end"]) {
    margin-inline-start: 11px;
}
::slotted([role="option"]),
::slotted(option) {
    flex: 0 0 auto;
}
`;
