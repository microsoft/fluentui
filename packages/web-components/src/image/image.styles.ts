import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorNeutralStroke2,
  shadow4,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { state } from '../utils/states.js';

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
  :host(${state('block')}) ::slotted(img) {
    width: 100%;
    height: auto;
  }
  :host(${state('bordered')}) ::slotted(img) {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host(${state('fit-none')}) ::slotted(img) {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  :host(${state('fit-center')}) ::slotted(img) {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(${state('fit-contain')}) ::slotted(img) {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(${state('fit-cover')}) ::slotted(img) {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(${state('shadowed')}) ::slotted(img) {
    box-shadow: ${shadow4};
  }
  :host(${state('circular')}) ::slotted(img) {
    border-radius: ${borderRadiusCircular};
  }
  :host(${state('rounded')}) ::slotted(img) {
    border-radius: ${borderRadiusMedium};
  }
`;
