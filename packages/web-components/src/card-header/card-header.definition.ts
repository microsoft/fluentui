import { FluentDesignSystem } from '../fluent-design-system.js';
import { CardHeader } from './card-header.js';
import { template } from './card-header.template.js';
import { styles } from './card-header.styles.js';

/**
 * The Fluent Card Header Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card-header\>
 */
export const definition = CardHeader.compose({
  name: `${FluentDesignSystem.prefix}-card-header`,
  template,
  styles,
});
