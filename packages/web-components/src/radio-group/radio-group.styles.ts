import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
import {
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalS,
} from '../theme/design-tokens.js';

/** RadioGroup styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    align-items: flex-start;
    flex-direction: column;
    row-gap: var(${spacingVerticalS});
  }
  :host([disabled]) ::slotted([role='radio']) {
    --control-border-color: var(${colorNeutralForegroundDisabled});
    --checked-indicator-background-color: var(${colorNeutralForegroundDisabled});
    --state-color: var(${colorNeutralForegroundDisabled});
  }
  ::slotted([slot='label']) {
    color: var(${colorNeutralForeground1});
    padding: var(${spacingVerticalS}) var(${spacingHorizontalS}) var(${spacingVerticalS}) var(${spacingHorizontalXS});
    font: var(${fontWeightRegular}) var(${fontSizeBase300}) / var(${lineHeightBase300}) var(${fontFamilyBase});
    cursor: default;
  }
  .positioning-region {
    display: flex;
    flex-wrap: wrap;
  }
  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
    justify-content: flex-start;
  }
  :host([orientation='horizontal']) .positioning-region {
    flex-direction: row;
  }
  :host([orientation='horizontal']) ::slotted([role='radio']) {
    padding-inline-end: var(${spacingHorizontalS});
  }
  :host([orientation='horizontal'][stacked]) ::slotted([role='radio']) {
    display: flex;
    flex-direction: column;
    padding-inline: var(${spacingHorizontalS});
    height: auto;
    align-items: center;
    justify-content: center;
  }
  :host([disabled]) ::slotted([role='radio']) {
    pointer-events: none;
  }
`;
