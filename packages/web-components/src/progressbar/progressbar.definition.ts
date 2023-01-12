import { FluentDesignSystem } from '../fluent-design-system.js';
import { ProgressBar } from './progressbar.js';
import { styles } from './progressbar.styles.js';
import { template } from './progressbar.template.js';

/**
 * The Fluent ProgressBar Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progressbar\>
 */
export const definition = ProgressBar.compose({
  name: `${FluentDesignSystem.prefix}-progressbar`,
  template,
  styles,
});
