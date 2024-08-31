import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';

/**
 * Styles of the {@link (DropdownList:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    flex-direction: column;
    margin: 0;
    position: absolute;
  }
`;
