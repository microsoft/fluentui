import { AnchoredRegion, anchoredRegionTemplate as template } from '@microsoft/fast-foundation';
import { anchoredRegionStyles as styles } from './anchored-region.styles';

/**
 * The Fluent AnchoredRegion Element. Implements {@link @microsoft/fast-foundation#AnchoredRegion},
 * {@link @microsoft/fast-foundation#anchoredRegionTemplate}
 *
 *
 * @beta
 * @remarks
 * HTML Element: \<fluent-anchored-region\>
 */
export const fluentAnchoredRegion = AnchoredRegion.compose({
  baseName: 'anchored-region',
  template,
  styles,
});

/**
 * Styles for AnchoredRegion
 * @public
 */
export const anchoredRegionStyles = styles;

/**
 * Base class for AnchoredRegion
 * @public
 */
export { AnchoredRegion };
