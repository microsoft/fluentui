import { BaseProgress as Progress, progressRingTemplate as template } from '@microsoft/fast-foundation';
import { progressRingStyles as styles } from './progress-ring.styles';

/**
 * The Fluent Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-ring\>
 */
export const fluentProgressRing = Progress.compose({
  baseName: 'progress-ring',
  template,
  styles,
});

/**
 * Styles for ProgressRing
 * @public
 */
export const progressRingStyles = styles;
