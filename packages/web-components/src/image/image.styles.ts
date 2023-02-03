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
 *
 * @public
 */
export const styles = css`
  :host img {
    box-sizing: border-box;
    min-height: 8px;
    min-width: 8px;
    display: inline-block;
  }
  :host([block]) img {
    width: 100%;
    height: auto;
  }
  :host([border]) img {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host([fit='none']) img {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  :host([fit='center']) img {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([fit='contain']) img {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([fit='cover']) img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([margin]) img {
    margin: 16px;
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
