import { FluentDesignSystem } from '../fluent-design-system.js';
import { Label } from './label.js';
import { styles } from './label.styles.js';
import { template } from './label.template.js';

/**
 * The Fluent Label Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-label\>
 */
export const definition = Label.compose({
  name: `${FluentDesignSystem.prefix}-label`,
  template,
  styles,
});
