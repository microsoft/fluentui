import { FluentDesignSystem } from '../fluent-design-system.js';
import { Spinner } from './spinner.js';
import { styles } from './spinner.styles.js';
import { template } from './spinner.template.js';

/**
 * The Fluent Spinner Element. Implements {@link @microsoft/fast-foundation#ProgressRing },
 * {@link @microsoft/fast-foundation#progress-ringTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-spinner\>
 */
export const definition = Spinner.compose({
  name: `${FluentDesignSystem.prefix}-spinner`,
  template,
  styles,
});
