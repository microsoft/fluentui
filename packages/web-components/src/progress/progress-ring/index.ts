import { BaseProgress, ProgressRingOptions, progressRingTemplate as template } from '@microsoft/fast-foundation';
import { progressRingStyles as styles } from './progress-ring.styles';

/**
 * Progress Ring base class
 * @public
 */
export class ProgressRing extends BaseProgress {}

/**
 * The Fluent Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-ring\>
 */
export const fluentProgressRing = ProgressRing.compose<ProgressRingOptions>({
  baseName: 'progress-ring',
  template,
  styles,
  indeterminateIndicator: `
    <svg class="progress" part="progress" viewBox="0 0 16 16">
        <circle
            class="background"
            part="background"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
        <circle
            class="indeterminate-indicator-1"
            part="indeterminate-indicator-1"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
    </svg>
  `,
});

/**
 * Styles for ProgressRing
 * @public
 */
export const progressRingStyles = styles;
