import { FluentDesignSystem } from '../fluent-design-system.js';
import { CardPreview } from './card-preview.js';
import { template } from './card-preview.template.js';
import { styles } from './card-preview.styles.js';

/**
 * The Fluent Card Preview Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card-preview\>
 */
export const definition = CardPreview.compose({
  name: `${FluentDesignSystem.prefix}-card-preview`,
  template,
  styles,
});
