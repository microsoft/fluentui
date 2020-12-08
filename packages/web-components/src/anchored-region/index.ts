import { customElement } from '@microsoft/fast-element';
// TODO: Update this pathing once we export anchored region from `fast-foundation`
import {
  AnchoredRegion,
  AnchoredRegionTemplate as template,
} from '@microsoft/fast-foundation/dist/esm/anchored-region/index';
import { AnchoredRegionStyles as styles } from './anchored-region.styles';

/**
 * The FAST AnchoredRegion Element. Implements {@link @microsoft/fast-foundation#AnchoredRegion},
 * {@link @microsoft/fast-foundation#AnchoredRegionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-anchored-region\>
 */
@customElement({
  name: 'fast-anchored-region',
  template,
  styles,
})
export class FASTAnchoredRegion extends AnchoredRegion {}

/**
 * Styles for AnchoredRegion
 * @public
 */
export const AnchoredRegionStyles = styles;
