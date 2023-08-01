import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {} from '../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  ${display('block')}
  :host {
    position: relative;
  }
  .positioning-container {
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
`;
