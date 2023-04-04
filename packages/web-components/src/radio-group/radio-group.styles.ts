import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorCompoundBrandForeground1,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralStrokeAccessible,
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
    --control-border-color: ${colorNeutralStrokeAccessible};
    --checked-indicator-background-color: ${colorCompoundBrandForeground1};
    --state-color: ${colorNeutralForeground3};
    align-items: flex-start;
    flex-direction: column;
    row-gap: ${spacingVerticalS};
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
