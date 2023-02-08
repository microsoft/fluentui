import { css } from '@microsoft/fast-element';
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
  colorNeutralStroke1,
  colorNeutralStrokeDisabled,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
} from '../../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
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
  :host::part(expand-collapse-glyph-container),
  ::slotted(span[slot='start']),
  ::slotted(span[slot='end']),
  .input-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
  :host::part(expand-collapse-glyph-container),
  :host::part(content),
  ::slotted(span[slot='start']),
  .input-container {
    color: ${colorNeutralForeground2};
  }
  ::slotted(span[slot='end']) {
    width: fit-content;
    color: ${colorNeutralForeground3};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    white-space: nowrap;
    padding-right: 8px;
    border-right: 1px solid ${colorNeutralStroke1};
  }
  :host(:hover) {
    background: ${colorNeutralBackground1Hover};
  }
  :host(:hover)::part(expand-collapse-glyph-container),
  :host(:hover)::part(content),
  :host(:hover) .input-container {
    color: ${colorNeutralForeground2Hover};
  }
  :host(:hover) ::slotted(span[slot='start']) {
    color: ${colorCompoundBrandForeground1Hover};
  }
  :host(:active) {
    background: ${colorNeutralBackground1Pressed};
  }
  :host(:active)::part(expand-collapse-glyph-container),
  :host(:active)::part(content),
  :host(:active) .input-container {
    color: ${colorNeutralForeground2Pressed};
  }
  :host(:active) ::slotted(span[slot='start']) {
    color: ${colorCompoundBrandForeground1Pressed};
  }

  :host([disabled='true']) {
    background: ${colorNeutralBackgroundDisabled};
  }
  :host([disabled='true'])::part(expand-collapse-glyph-container),
  :host([disabled='true']) .input-container,
  :host([disabled='true']) ::slotted(span[slot='start']),
  :host([disabled='true']) ::slotted(span[slot='end']),
  :host([disabled='true'])::part(content) {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled='true']) ::slotted(span[slot='end']) {
    border-color: ${colorNeutralStrokeDisabled};
  }

  :host::part(checkbox),
  :host::part(radio) {
    display: none;
  }
  :host([checked])::part(checkbox),
  :host([checked])::part(radio) {
    display: block;
  }
`;
