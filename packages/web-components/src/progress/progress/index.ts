import { customElement } from '@microsoft/fast-element';
import { BaseProgress, ProgressTemplate as template } from '@microsoft/fast-foundation';
import { ProgressStyles as styles } from './progress.styles';

/**
 * The Fluent Progress Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#ProgressTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress\>
 */
@customElement({
  name: 'fluent-progress',
  template,
  styles,
  shadowOptions: {
    mode: 'closed',
  },
})
export class FluentProgress extends BaseProgress {}

/**
 * Styles for Progress
 * @public
 */
export const ProgressStyles = styles;
