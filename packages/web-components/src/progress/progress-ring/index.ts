import { customElement } from '@microsoft/fast-element';
import { BaseProgress, ProgressRingTemplate as template } from '@microsoft/fast-foundation';
import { ProgressRingStyles as styles } from './progress-ring.styles';

/**
 * The FAST Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#ProgressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-progress-ring\>
 */
@customElement({
  name: 'fast-progress-ring',
  template,
  styles,
})
export class FASTProgressRing extends BaseProgress {}

/**
 * Styles for ProgressRing
 * @public
 */
export const ProgressRingStyles = styles;
