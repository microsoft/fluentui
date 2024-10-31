import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorNeutralStroke2,
  shadow4,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import {
  blockState,
  borderedState,
  circularState,
  fitCenterState,
  fitContainState,
  fitCoverState,
  fitNoneState,
  roundedState,
  shadowState,
} from '../styles/states/index.js';

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
  :host(${blockState}) ::slotted(img) {
    width: 100%;
    height: auto;
  }
  :host(${borderedState}) ::slotted(img) {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  :host(${fitNoneState}) ::slotted(img) {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  :host(${fitCenterState}) ::slotted(img) {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(${fitContainState}) ::slotted(img) {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(${fitCoverState}) ::slotted(img) {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  :host(${shadowState}) ::slotted(img) {
    box-shadow: ${shadow4};
  }
  :host(${circularState}) ::slotted(img) {
    border-radius: ${borderRadiusCircular};
  }
  :host(${roundedState}) ::slotted(img) {
    border-radius: ${borderRadiusMedium};
  }
`;
