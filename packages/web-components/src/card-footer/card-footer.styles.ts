import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

/** Card Footer styles
 * @public
 */
export const styles = css`
  ${display('flex')}
  :host {
    display: grid;
    grid-template-columns: 1fr min-content;
  }

  .content {
    display: flex;
    column-gap: var(--card-size, 12px);
  }
`;
