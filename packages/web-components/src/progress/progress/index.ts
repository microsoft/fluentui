import { customElement } from '@microsoft/fast-element';
import { BaseProgress, ProgressTemplate as template } from '@microsoft/fast-foundation';
import { ProgressStyles as styles } from './progress.styles';

/**
 * The FAST Progress Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#ProgressTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-progress\>
 */
@customElement({
  name: 'fast-progress',
  template,
  styles,
})
export class FASTProgress extends BaseProgress {}

/**
 * Styles for Progress
 * @public
 */
export const ProgressStyles = styles;
