import { FluentDesignSystem } from '../fluent-design-system.js';
import { CardFooter } from './card-footer.js';
import { template } from './card-footer.template.js';
import { styles } from './card-footer.styles.js';

/**
 * The Fluent Card Footer Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card-footer\>
 */
export const definition = CardFooter.compose({
  name: `${FluentDesignSystem.prefix}-card-footer`,
  template,
  styles,
});
