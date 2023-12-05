import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
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
    background: var(${colorNeutralBackground1});
    font: var(${fontWeightRegular}) var(${fontSizeBase300}) / var(${lineHeightBase300}) var(${fontFamilyBase});
    border-radius: var(${borderRadiusMedium});
    color: var(${colorNeutralForeground2});
    padding: 0 10px;
    cursor: pointer;
    overflow: visible;
    contain: layout;
  }

  :host(:hover) {
    background: var(${colorNeutralBackground1Hover});
  }

  .content {
    white-space: nowrap;
    flex-grow: 1;
    grid-column: auto / span 2;
    padding: 0 2px;
  }

  .checkbox,
  .radio {
    display: none;
  }

  .input-container,
  .expand-collapse-glyph-container,
  ::slotted([slot='start']),
  ::slotted([slot='end']),
  :host([checked]) .checkbox,
  :host([checked]) .radio {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: var(${colorNeutralForeground2});
  }

  .expand-collapse-glyph-container,
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    height: 32px;
    font-size: var(${fontSizeBase500});
    width: fit-content;
  }

  .input-container {
    width: 20px;
  }

  ::slotted([slot='end']) {
    color: var(${colorNeutralForeground3});
    font: var(${fontWeightRegular}) var(${fontSizeBase200}) / var(${lineHeightBase200}) var(${fontFamilyBase});
    white-space: nowrap;
    grid-column: 4 / span 1;
    justify-self: flex-end;
  }

  .expand-collapse-glyph-container {
    grid-column: 4 / span 1;
    justify-self: flex-end;
  }

  :host(:hover) .input-container,
  :host(:hover) .expand-collapse-glyph-container,
  :host(:hover) .content {
    color: var(${colorNeutralForeground2Hover});
  }

  :host([icon]:hover) ::slotted([slot='start']) {
    color: var(${colorCompoundBrandForeground1Hover});
  }

  :host(:active) {
    background-color: var(${colorNeutralBackground1Selected});
  }

  :host(:active) .input-container,
  :host(:active) .expand-collapse-glyph-container,
  :host(:active) .content {
    color: var(${colorNeutralForeground2Pressed});
  }

  :host(:active) ::slotted([slot='start']) {
    color: var(${colorCompoundBrandForeground1Pressed});
  }

  :host([disabled]) {
    background-color: var(${colorNeutralBackgroundDisabled});
  }

  :host([disabled]) .content,
  :host([disabled]) .expand-collapse-glyph-container,
  :host([disabled]) ::slotted([slot='end']),
  :host([disabled]) ::slotted([slot='start']) {
    color: var(${colorNeutralForegroundDisabled});
  }

  :host([data-indent]) {
    display: grid;
  }

  :host([data-indent='1']) .content {
    grid-column: 2 / span 1;
  }

  :host([data-indent='1'][role='menuitemcheckbox']) {
    display: grid;
  }

  :host([data-indent='2'][aria-haspopup='menu']) ::slotted([slot='end']) {
    grid-column: 4 / span 1;
  }

  :host([data-indent='2'][aria-haspopup='menu']) .expand-collapse-glyph-container {
    grid-column: 5 / span 1;
  }

  :host([data-indent='1']) .content {
    grid-column: 2 / span 1;
  }

  :host([data-indent='1'][role='menuitemcheckbox']) .content,
  :host([data-indent='1'][role='menuitemradio']) .content {
    grid-column: auto / span 1;
  }

  :host([icon]) ::slotted([slot='end']),
  :host([data-indent='1']) ::slotted([slot='end']) {
    grid-column: 4 / span 1;
    justify-self: flex-end;
  }

  :host([data-indent='2']) {
    display: grid;
    grid-template-columns: 20px 20px auto auto;
  }

  :host([data-indent='2']) .content {
    grid-column: 3 / span 1;
  }

  :host([data-indent='2']) .input-container {
    grid-column: 1 / span 1;
  }

  :host([data-indent='2']) ::slotted([slot='start']) {
    grid-column: 2 / span 1;
  }

  :host([aria-haspopup='menu']) {
    grid-template-columns: 20px auto auto 20px;
  }

  :host([data-indent='2'][aria-haspopup='menu']) {
    grid-template-columns: 20px 20px auto auto 20px;
  }

  :host([aria-haspopup='menu']) ::slotted([slot='end']) {
    grid-column: 3 / span 1;
    justify-self: flex-end;
  }

  :host([data-indent='2'][aria-haspopup='menu']) ::slotted([slot='end']) {
    grid-column: 4 / span 1;
    justify-self: flex-end;
  }
`;
