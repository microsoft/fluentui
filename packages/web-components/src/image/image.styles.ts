import { css } from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderRadiusXLarge,
  colorNeutralStroke2,
  shadow4,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Image styles
 * @public
 */
export const styles = css`
  :host img {
    box-sizing: border-box;
    min-height: 8px;
    min-width: 8px;
    padding: 0;
    margin: 0;
  }
  :host([block]) img {
    display: block;
  }
  :host([border]) img {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host([fit='none']) {
  }
  :host([fit='center']) {
  }
  :host([fit='contain']) {
  }
  :host([fit='cover']) {
  }
  :host([margin]) img {
    margin: 8px;
  }
  :host([shadow]) img {
    box-shadow: ${shadow4};
  }
  :host([shape='circular']) img {
    border-radius: 100%;
  }
  :host([shape='rounded'][borderRadius='small']) img {
    border-radius: ${borderRadiusSmall};
  }
  :host([shape='rounded'][borderRadius='medium']) img {
    border-radius: ${borderRadiusMedium};
  }
  :host([shape='rounded'][borderRadius='large']) img {
    border-radius: ${borderRadiusLarge};
  }
  :host([shape='rounded'][borderRadius='x-large']) img {
    border-radius: ${borderRadiusXLarge};
  }
  :host([shape='square']) img {
    border-radius: none;
  }
`;
