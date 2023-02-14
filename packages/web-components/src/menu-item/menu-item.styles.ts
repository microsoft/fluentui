import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorCompoundBrandForeground1Hover,
  colorCompoundBrandForeground1Pressed,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
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
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase200,
  lineHeightBase300,
} from '../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    display: flex;
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
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
  :host .content {
    flex-grow: 1;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }

  :host(.header) {
    background: ${colorNeutralBackground1};
    pointer-events: none;
    padding: 0 8px;
  }

  :host(.header) .content {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightBase200};
  }

  .expand-collapse-glyph-container,
  ::slotted([slot='start']),
  ::slotted([slot='end']) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 32px;
    font-size: 20px;
  }
  .input-container {
    width: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .expand-collapse-glyph-container,
  .content,
  ::slotted(span[slot='start']),
  .input-container {
    color: ${colorNeutralForeground2};
  }
  ::slotted([slot='end']) {
    width: fit-content;
    color: ${colorNeutralForeground3};
    font-family: ${fontFamilyBase};
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
  :host(:hover) ::slotted(span[slot='start']) {
    color: ${colorCompoundBrandForeground1Hover};
  }
  :host(:active) {
    background: ${colorNeutralBackground1Pressed};
  }
  :host(:active) .expand-collapse-glyph-container,
  :host(:active) .content,
  :host(:active) .input-container {
    color: ${colorNeutralForeground2Pressed};
  }
  :host(:active) ::slotted([slot='start']) {
    color: ${colorCompoundBrandForeground1Pressed};
  }

  :host([disabled='true']) {
    background: ${colorNeutralBackgroundDisabled};
  }
  :host([disabled='true']) .expand-collapse-glyph-container,
  :host([disabled='true']) .input-container,
  :host([disabled='true']) ::slotted([slot='start']),
  :host([disabled='true']) ::slotted([slot='end']),
  :host([disabled='true']) .content {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled='true']) ::slotted(span[slot='end']) {
    border-color: ${colorNeutralStrokeDisabled};
  }

  .checkbox,
  .radio {
    display: none;
  }
  :host([checked]) .checkbox,
  :host([checked]) .radio {
    display: flex;
  }
`;
