import { css } from '@microsoft/fast-element';
import {
  colorNeutralBackground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
} from '../../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    height: 32px;
    padding: 0 6px;
    margin: 1px 4px;
    background: ${colorNeutralBackground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }
  :host([:first-of-type]) {
  }
`;
