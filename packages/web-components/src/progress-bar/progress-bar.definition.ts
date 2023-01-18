import { FluentDesignSystem } from '../fluent-design-system.js';
import { ProgressBar } from './progress-bar.js';
import { styles } from './progress-bar.styles.js';
import { template } from './progress-bar.template.js';

/**
 * The Fluent ProgressBar Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-bar\>
 */
export const definition = ProgressBar.compose({
  name: `${FluentDesignSystem.prefix}-progress-bar`,
  template,
  styles,
});
