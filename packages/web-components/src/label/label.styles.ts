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
import { largeState, smallState } from '../styles/states/index.js';

/** Label styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    color: ${colorNeutralForeground1};
    cursor: pointer;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    user-select: none;
  }

  .asterisk {
    color: ${colorPaletteRedForeground1};
    margin-inline-start: ${spacingHorizontalXS};
  }

  :host(${smallState}) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host(${largeState}) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host(${largeState}),
  :host(:is([state--semibold], :state(semibold))) {
    font-weight: ${fontWeightSemibold};
  }

  :host(:is([state--disabled], :state(disabled))),
  :host(:is([state--disabled], :state(disabled))) .asterisk {
    color: ${colorNeutralForegroundDisabled};
  }
`;
