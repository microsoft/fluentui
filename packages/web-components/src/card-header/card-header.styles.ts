import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { fontSizeBase300, fontWeightBold } from '../theme/design-tokens.js';

/** Card Header styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    position: relative;
    display: grid;
    column-gap: var(--card-size, 12px);
    grid-template-columns: auto 1fr auto;
  }

  ::slotted([slot='image']) {
    align-self: center;
  }
  ::slotted([slot='header']) {
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightBold};
  }
  ::slotted([slot='action']) {
    grid-column: 3;
  }
`;
