import { Skeleton, skeletonTemplate as template } from '@microsoft/fast-foundation';
import { skeletonStyles as styles } from './skeleton.styles';

/**
 * The Fluent Skeleton Element. Implements {@link @microsoft/fast-foundation#Skeleton},
 * {@link @microsoft/fast-foundation#skeletonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-skeleton\>
 */
export const fluentSkeleton = Skeleton.compose({
  baseName: 'skeleton',
  template,
  styles,
});

/**
 * Styles for Skeleton
 * @public
 */
export const skeletonStyles = styles;

/**
 * Skeleton base class
 * @public
 */
export { Skeleton };
