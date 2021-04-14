import { customElement } from '@microsoft/fast-element';
import { AnchoredRegion, AnchoredRegionTemplate as template } from '@microsoft/fast-foundation';
import { AnchoredRegionStyles as styles } from './anchored-region.styles';

/**
 * The Fluent AnchoredRegion Element. Implements {@link @microsoft/fast-foundation#AnchoredRegion},
 * {@link @microsoft/fast-foundation#AnchoredRegionTemplate}
 *
 *
 * @beta
 * @remarks
 * HTML Element: \<fluent-anchored-region\>
 */
@customElement({
  name: 'fluent-anchored-region',
  template,
  styles,
})
export class FluentAnchoredRegion extends AnchoredRegion {}

/**
 * Styles for AnchoredRegion
 * @public
 */
export const AnchoredRegionStyles = styles;
