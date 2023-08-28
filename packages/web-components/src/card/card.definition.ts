import { FluentDesignSystem } from '../fluent-design-system.js';
import { Card } from './card.js';
import { template } from './card.template.js';
import { styles } from './card.styles.js';

/**
 * The Fluent Card Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card\>
 */
export const definition = Card.compose({
  name: `${FluentDesignSystem.prefix}-card`,
  template,
  styles,
});
