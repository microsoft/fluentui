import { BaseProgress, ProgressOptions, progressTemplate as template } from '@microsoft/fast-foundation';
import { progressStyles as styles } from './progress.styles';

/**
 * Progress base class
 * @public
 */
export class Progress extends BaseProgress {}

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
    <span class="indeterminate-indicator-2" part="indeterminate-indicator-2"></span>
  `,
});

/**
 * Styles for Progress
 * @public
 */
export const progressStyles = styles;
