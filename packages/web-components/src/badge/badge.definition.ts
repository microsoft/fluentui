import { FluentDesignSystem } from '../fluent-design-system.js';
import { Badge } from './badge.js';
import { styles } from './badge.styles.js';
import { template } from './badge.template.js';

/**
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const definition = Badge.compose({
  name: `${FluentDesignSystem.prefix}-badge`,
  template,
  styles,
});
