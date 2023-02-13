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
  :host ::slotted(img) {
    box-sizing: border-box;
    min-height: 8px;
    min-width: 8px;
    display: inline-block;
  }
  :host([border]) ::slotted(img) {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host([fit='none']) ::slotted(img) {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  :host([fit='center']) ::slotted(img) {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([fit='contain']) ::slotted(img) {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([fit='cover']) ::slotted(img) {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host([shadow]) ::slotted(img) {
    box-shadow: ${shadow4};
  }
  :host([shape='circular']) ::slotted(img) {
    border-radius: 100%;
  }
  :host([shape='rounded'][border-radius='small']) ::slotted(img) {
    border-radius: ${borderRadiusSmall};
  }
  :host([shape='rounded'][border-radius='medium']) ::slotted(img) {
    border-radius: ${borderRadiusMedium};
  }
  :host([shape='rounded'][border-radius='large']) ::slotted(img) {
    border-radius: ${borderRadiusLarge};
  }
  :host([shape='rounded'][border-radius='x-large']) ::slotted(img) {
    border-radius: ${borderRadiusXLarge};
  }
  :host([shape='square']) ::slotted(img) {
    border-radius: none;
  }
`;
