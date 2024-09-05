import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';

/**
 * Styles of the {@link (Dropdown:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    border: 1px solid currentcolor;
    cursor: pointer;
    min-block-size: 1lh;
    touch-action: manipulation;
  }
`;
