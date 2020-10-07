import { customElement } from '@microsoft/fast-element';
import { Skeleton, SkeletonTemplate as template } from '@microsoft/fast-foundation';
import { SkeletonStyles as styles } from './skeleton.styles';

/**
 * The Fluent Skeleton Element. Implements {@link @microsoft/fast-foundation#Skeleton},
 * {@link @microsoft/fast-foundation#SkeletonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-skeleton\>
 */
@customElement({
  name: 'fluent-skeleton',
  template,
  styles,
})
export class FluentSkeleton extends Skeleton {}

/**
 * Styles for Skeleton
 * @public
 */
export const SkeletonStyles = styles;
