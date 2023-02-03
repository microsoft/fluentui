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
  :host ::slotted(*) {
    box-sizing: border-box;
    min-height: 8px;
    min-width: 8px;
    display: inline-block;
  }
  :host([block]) ::slotted(*) {
    width: 100%;
    height: auto;
  }
  :host([border]) ::slotted(*) {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host([fit='none']) ::slotted(*) {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  :host([fit='center']) ::slotted(*) {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([fit='contain']) ::slotted(*) {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([fit='cover']) ::slotted(*) {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([margin]) ::slotted(*) {
    margin: 16px;
  }
  :host([shadow]) ::slotted(*) {
    box-shadow: ${shadow4};
  }
  :host([shape='circular']) ::slotted(*) {
    border-radius: 100%;
  }
  :host([shape='rounded'][borderRadius='small']) ::slotted(*) {
    border-radius: ${borderRadiusSmall};
  }
  :host([shape='rounded'][borderRadius='medium']) ::slotted(*) {
    border-radius: ${borderRadiusMedium};
  }
  :host([shape='rounded'][borderRadius='large']) ::slotted(*) {
    border-radius: ${borderRadiusLarge};
  }
  :host([shape='rounded'][borderRadius='x-large']) ::slotted(*) {
    border-radius: ${borderRadiusXLarge};
  }
  :host([shape='square']) ::slotted(*) {
    border-radius: none;
  }
`;
