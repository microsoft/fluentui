import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {} from '../theme/design-tokens.js';

/** Radio styles
 * @public
 */
export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    margin: 2px 0;
  }
  .positioning-region {
    display: flex;
    flex-wrap: wrap;
  }
  :host([orientation='vertical']) .positioning-region {
    flex-direction: column;
  }
  :host([orientation='horizontal']) .positioning-region {
    flex-direction: row;
  }
  :host([disabled]) {
    opacity: 0.5;
  }
`;
