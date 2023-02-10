import { css } from '@microsoft/fast-element';
import {
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorPaletteRedForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  spacingHorizontalXS,
  spacingHorizontalXXS,
} from '../theme/design-tokens.js';

/** Label styles
 * @public
 */
export const styles = css`
  .label {
    display: flex;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground1};
  }
  .asterisk {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    color: ${colorPaletteRedForeground1};
    margin-left: ${spacingHorizontalXS};
  }
  ::slotted(span[slot='info-icon']) {
    display: inline-flex;
    align-items: flex-start;
    color: ${colorNeutralForeground3};
    margin-left: ${spacingHorizontalXXS};
  }
`;
