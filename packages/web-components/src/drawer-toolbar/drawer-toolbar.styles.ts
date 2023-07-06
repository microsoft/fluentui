import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {} from '../theme/design-tokens.js';

/** PaneSwitcher styles
 * @public
 */
export const styles = css`
  ${display('flex')}
  :host {
    width: 100%;
    height: 32px;
  }
  .toolbar {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-direction: row;
    align-items: center;
  }
  .end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;
