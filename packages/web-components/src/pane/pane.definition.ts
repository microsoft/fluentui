import { FluentDesignSystem } from '../fluent-design-system.js';
import { Pane } from './pane.js';
import { styles } from './pane.styles.js';
import { template } from './pane.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: <fluent-pane>
 */

export const definition = Pane.compose({
  name: `${FluentDesignSystem.prefix}-pane`,
  template,
  styles,
});
