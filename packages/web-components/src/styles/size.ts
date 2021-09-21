import { cssPartial } from '@microsoft/fast-element';
import { baseHeightMultiplier, density, designUnit } from '../design-tokens';

/**
 * A formula to retrieve the control height.
 * Use this as the value of any CSS property that
 * accepts a pixel size.
 * @public
 */
export const heightNumber = cssPartial`(${baseHeightMultiplier} + ${density}) * ${designUnit}`;
