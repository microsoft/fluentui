import { customElement } from '@microsoft/fast-element';
import { BaseProgress, ProgressRingTemplate as template } from '@microsoft/fast-foundation';
import { ProgressRingStyles as styles } from './progress-ring.styles';

/**
 * The Fluent Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#ProgressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-ring\>
 */
@customElement({
  name: 'fluent-progress-ring',
  template,
  styles,
})
export class FluentProgressRing extends BaseProgress {}

/**
 * Styles for ProgressRing
 * @public
 */
export const ProgressRingStyles = styles;
