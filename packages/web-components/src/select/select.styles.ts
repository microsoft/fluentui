import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')} :host {
  }

  select {
    width: 100%;
    height: 2rem;
    padding: 0.25rem 1rem 0.25rem 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;
