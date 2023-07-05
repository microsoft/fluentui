import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {} from '../theme/design-tokens.js';

/** PaneSwitcher styles
 * @public
 */
export const styles = css`
  ${display('flex')}
  :host {
    flex-direction: column;
    position: absolute;
    z-index: 999;
    right: 0;
    top: 0;
  }
  .toggle-buttons {
    display: flex;
    flex-direction: column;
  }
`;
