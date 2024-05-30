import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorPaletteRedForeground1,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalXS,
} from '../theme/design-tokens.js';

/** Label styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
  }
  .asterisk {
    color: ${colorPaletteRedForeground1};
    margin-left: ${spacingHorizontalXS};
  }
  :host([size='small']) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host([size='large']) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    font-weight: ${fontWeightSemibold};
  }
  :host([weight='semibold']) {
    font-weight: ${fontWeightSemibold};
  }
  :host([disabled]),
  :host([disabled]) .asterisk {
    color: ${colorNeutralForegroundDisabled};
  }
`;
