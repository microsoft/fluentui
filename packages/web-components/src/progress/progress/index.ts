import { BaseProgress as Progress, progressTemplate as template } from '@microsoft/fast-foundation';
import type { ProgressOptions } from '@microsoft/fast-foundation';
import { progressStyles as styles } from './progress.styles';

/**
 * The Fluent Progress Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress\>
 */
export const fluentProgress = Progress.compose<ProgressOptions>({
  baseName: 'progress',
  template,
  styles,
  indeterminateIndicator1: `
    <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
  `,
  indeterminateIndicator2: `
    <span class="indeterminate-indicator-1" part="indeterminate-indicator-1"></span>
  `,
});

/**
 * Styles for Progress
 * @public
 */
export const progressStyles = styles;

/**
 * Progress base class
 * @public
 */
export { Progress };
