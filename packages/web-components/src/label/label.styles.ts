import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
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
    font-family: var(${fontFamilyBase});
    font-size: var(${fontSizeBase300});
    line-height: var(${lineHeightBase300});
    font-weight: var(${fontWeightRegular});
    color: var(${colorNeutralForeground1});
  }
  .asterisk {
    color: var(${colorPaletteRedForeground1});
    margin-left: var(${spacingHorizontalXS});
  }
  :host([size='small']) {
    font-size: var(${fontSizeBase200});
    line-height: var(${lineHeightBase200});
  }
  :host([size='large']) {
    font-size: var(${fontSizeBase400});
    line-height: var(${lineHeightBase400});
    font-weight: var(${fontWeightSemibold});
  }
  :host([weight='semibold']) {
    font-weight: var(${fontWeightSemibold});
  }
  :host([disabled]),
  :host([disabled]) .asterisk {
    color: var(${colorNeutralForegroundDisabled});
  }
`;
