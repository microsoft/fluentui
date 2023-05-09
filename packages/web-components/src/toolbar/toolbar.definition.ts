import { FluentDesignSystem } from '../fluent-design-system.js';
import { Toolbar } from './toolbar.js';
import { styles } from './toolbar.styles.js';
import { template } from './toolbar.template.js';

/**
 * The Fluent Toolbar Element. Implements {@link @microsoft/fast-foundation#FASTToolbar},
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-toolbar\>
 */
export const definition = Toolbar.compose({
  name: `${FluentDesignSystem.prefix}-toolbar`,
  template,
  styles,
});
