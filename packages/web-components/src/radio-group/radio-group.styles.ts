import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
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
    row-gap: ${spacingVerticalS};
  }
  :host([disabled]) ::slotted([role='radio']) {
    --control-border-color: ${colorNeutralForegroundDisabled};
    --checked-indicator-background-color: ${colorNeutralForegroundDisabled};
    --state-color: ${colorNeutralForegroundDisabled};
  }
  ::slotted([slot='label']) {
    color: ${colorNeutralForeground1};
    padding: ${spacingVerticalS} ${spacingHorizontalS} ${spacingVerticalS} ${spacingHorizontalXS};
    font: ${fontWeightRegular} ${fontSizeBase300} / ${lineHeightBase300} ${fontFamilyBase};
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
    padding-inline-end: ${spacingHorizontalS};
  }
  :host([orientation='horizontal'][stacked]) ::slotted([role='radio']) {
    display: flex;
    flex-direction: column;
    padding-inline: ${spacingHorizontalS};
    height: auto;
    align-items: center;
    justify-content: center;
  }
  :host([disabled]) ::slotted([role='radio']) {
    pointer-events: none;
  }
`;
