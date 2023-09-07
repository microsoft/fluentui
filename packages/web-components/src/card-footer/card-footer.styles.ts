import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

/** Card Footer styles
 * @public
 */
export const styles = css`
  ${display('flex')}
  :host {
    column-gap: var(--card-size, 12px);
  }
`;
