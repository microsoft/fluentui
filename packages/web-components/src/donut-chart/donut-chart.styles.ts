import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';

/**
 * Styles for the DonutChart component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  .root {
    background-color: var(--background-color);
  }
`;
