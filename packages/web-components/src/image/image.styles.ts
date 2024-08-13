import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorNeutralStroke2,
  shadow4,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { circularState, roundedState } from '../styles/states/index.js';

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
  :host(:is([state--block], :state(block))) ::slotted(img) {
    width: 100%;
    height: auto;
  }
  :host(:is([state--bordered], :state(bordered))) ::slotted(img) {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host(:is([state--fit-none], :state(fit-none))) ::slotted(img) {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  :host(:is([state--fit-center], :state(fit-center))) ::slotted(img) {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(:is([state--fit-contain], :state(fit-contain))) ::slotted(img) {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(:is([state--fit-cover], :state(fit-cover))) ::slotted(img) {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(:is([state--shadowed], :state(shadowed))) ::slotted(img) {
    box-shadow: ${shadow4};
  }
  :host(${circularState}) ::slotted(img) {
    border-radius: ${borderRadiusCircular};
  }
  :host(${roundedState}) ::slotted(img) {
    border-radius: ${borderRadiusMedium};
  }
`;
