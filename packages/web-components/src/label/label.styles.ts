import { css } from '@microsoft/fast-element';
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
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';

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

  :host(${state('small')}) {
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
  }

  :host(${state('large')}) {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host(:is(${state('large')}, ${state('semibold')})) {
    font-weight: ${fontWeightSemibold};
  }

  :host(${state('disabled')}),
  :host(${state('disabled')}) .asterisk {
    color: ${colorNeutralForegroundDisabled};
  }
`;
