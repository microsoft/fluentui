import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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
  colorNeutralStrokeDisabled,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase500,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
} from '../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    align-items: center;
    row-gap: 4px;
    column-gap: 4px;
    width: auto;
    height: 32px;
    background: ${colorNeutralBackground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    border-radius: ${borderRadiusMedium};
    padding: 0 10px;
    margin: 1px 0;
    cursor: pointer;
    overflow: visible;
    contain: layout;
  }
  :host(:hover) {
    position: relative;
    z-index: 1;
  }
  .content {
    flex-grow: 1;
    padding: 0 2px;
  }
  .checkbox,
  .radio {
    display: none;
  }
  .expand-collapse-glyph-container,
  ::slotted([slot='start']),
  ::slotted([slot='end']),
  :host([checked]) .checkbox,
  :host([checked]) .radio,
  .input-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .expand-collapse-glyph-container,
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    width: fit-content;
    height: 32px;
    font-size: ${fontSizeBase500};
  }
  .input-container {
    width: 20px;
  }
  ::slotted([slot='start']),
  .expand-collapse-glyph-container,
  .content,
  .input-container {
    color: ${colorNeutralForeground2};
  }
  ::slotted([slot='end']) {
    width: fit-content;
    color: ${colorNeutralForeground3};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    white-space: nowrap;
  }
  :host(:hover) {
    background: ${colorNeutralBackground1Hover};
  }
  :host(:hover) .expand-collapse-glyph-container,
  :host(:hover) .content,
  :host(:hover) .input-container {
    color: ${colorNeutralForeground2Hover};
  }
  :host(:hover) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Hover};
  }
  :host(:active) {
    background: ${colorNeutralBackground1Selected};
  }
  :host(:active) .expand-collapse-glyph-container,
  :host(:active) .content,
  :host(:active) .input-container {
    color: ${colorNeutralForeground2Pressed};
  }
  :host(:active) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Pressed};
  }
  :host([disabled]) {
    background: ${colorNeutralBackgroundDisabled};
  }
  :host([disabled]) .expand-collapse-glyph-container,
  :host([disabled]) .input-container,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) ::slotted([slot='end']),
  :host([disabled]) .content {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) ::slotted([slot='end']) {
    border-color: ${colorNeutralStrokeDisabled};
  }
`;
