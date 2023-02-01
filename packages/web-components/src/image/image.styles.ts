import { css } from '@microsoft/fast-element';
import { colorNeutralStroke2, strokeWidthThin } from '../theme/design-tokens.js';

/** Image styles
 * @public
 */
export const styles = css`
  :host {
  }

  :host([border]) {
    border: ${strokeWidthThin}px solid ${colorNeutralStroke2};
  }
`;
