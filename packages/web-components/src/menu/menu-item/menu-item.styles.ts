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
    column-gap: 4px;
    width: auto;
    height: 32px;
    background: ${colorNeutralBackground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    padding-left: 10px;
    padding-right: 10px;
  }

  ::slotted(span[slot='start']),
  ::slotted(span[slot='end']) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
`;
