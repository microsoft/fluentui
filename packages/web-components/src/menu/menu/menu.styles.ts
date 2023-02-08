import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStroke,
  shadow16,
} from '../../theme/design-tokens.js';

/** Menu styles
 * @public
 */
export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: auto;
    min-width: 160px;
    max-width: 300px;
    background: ${colorNeutralBackground1};
    border: 1px solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    box-shadow: ${shadow16};
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;
