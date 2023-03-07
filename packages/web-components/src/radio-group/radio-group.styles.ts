import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin: 2px 0;
  }
  ::slotted([slot='label']) {
    color: ${colorNeutralForeground3};
    padding: ${spacingVerticalS} ${spacingHorizontalS} ${spacingVerticalS} ${spacingHorizontalXS};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    cursor: default;
  }
  .positioning-region {
    display: flex;
    flex-wrap: wrap;
  }
  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
  }
  :host([orientation='horizontal']) .positioning-region {
    flex-direction: row;
  }
  :host([disabled]) {
    opacity: 0.5;
  }
`;
