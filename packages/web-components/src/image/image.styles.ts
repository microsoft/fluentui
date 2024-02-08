import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorNeutralStroke2,
  shadow4,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Image styles
 *
 * @public
 */
export const styles = css`
  :host {
    contain: content;
  }

  :host ::slotted(img) {
    box-sizing: border-box;
    min-height: 8px;
    min-width: 8px;
    display: inline-block;
  }
  :host([block]) ::slotted(img) {
    width: 100%;
    height: auto;
  }
  :host([bordered]) ::slotted(img) {
    border: var(${strokeWidthThin}) solid var(${colorNeutralStroke2});
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
    box-shadow: var(${shadow4});
  }
  :host([shape='circular']) ::slotted(img) {
    border-radius: var(${borderRadiusCircular});
  }
  :host([shape='rounded']) ::slotted(img) {
    border-radius: var(${borderRadiusMedium});
  }
`;
