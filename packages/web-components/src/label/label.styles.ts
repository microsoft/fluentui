import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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

  .label {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
  }
  .asterisk {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    color: ${colorPaletteRedForeground1};
  }
  :host([size='small']) .label,
  :host([size='small']) .asterisk {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }
  :host([size='large']) .label,
  :host([size='large']) .asterisk {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    font-weight: ${fontWeightSemibold};
  }
  :host([weight='semibold']) .label,
  :host([weight='semibold']) .asterisk {
    font-weight: ${fontWeightSemibold};
  }
  :host([weight='semibold']) .label,
  :host([weight='semibold']) .asterisk {
    font-weight: ${fontWeightSemibold};
  }
  :host([disabled]) .label,
  :host([disabled]) .asterisk {
    color: ${colorNeutralForegroundDisabled};
  }
`;
