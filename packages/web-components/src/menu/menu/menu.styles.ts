import { css } from '@microsoft/fast-element';
import { colorNeutralBackground1, colorNeutralStrokeAccessible, strokeWidthThin } from '../../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    min-width: 160px;
    background: ${colorNeutralBackground1};
    border: 1px solid ${colorNeutralStrokeAccessible};
    margin-top: -1px;
    margin-bottom: -1px;
  }
`;
