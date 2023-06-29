import { css } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  colorNeutralStroke2,
  shadow4,
  strokeWidthThin,
} from '../../theme/design-tokens.js';

/** Image styles
 *
 * @public
 */
export const styles = css`
  img[is='fluent-image'] {
    contain: content;
    box-sizing: border-box;
    min-height: 8px;
    min-width: 8px;
    display: inline-block;
  }
  img[is='fluent-image'][block] {
    width: 100%;
    height: auto;
  }
  img[is='fluent-image'][bordered] {
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
  }
  img[is='fluent-image'][fit='none'] {
    object-fit: none;
    object-position: top left;
    height: 100%;
    width: 100%;
  }
  img[is='fluent-image'][fit='center'] {
    object-fit: none;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  img[is='fluent-image'][fit='contain'] {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  img[is='fluent-image'][fit='cover'] {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }
  img[is='fluent-image'][shadow] {
    box-shadow: ${shadow4};
  }
  img[is='fluent-image'][shape='circular'] {
    border-radius: ${borderRadiusCircular};
  }
  img[is='fluent-image'][shape='rounded'] {
    border-radius: ${borderRadiusMedium};
  }
`;
