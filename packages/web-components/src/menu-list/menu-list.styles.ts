import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorTransparentStroke,
  shadow16,
} from '../theme/design-tokens.js';

/** MenuList styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    flex-direction: column;
    height: fit-content;
    max-width: 300px;
    min-width: 160px;
    width: auto;
    background-color: ${colorNeutralBackground1};
    border: 1px solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    box-shadow: ${shadow16};
    padding: 4px;
    row-gap: 2px;
  }
`;
