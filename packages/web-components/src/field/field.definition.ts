import { FluentDesignSystem } from '../fluent-design-system.js';
import { Field } from './field.js';
import { styles } from './field.styles.js';
import { template } from './field.template.js';

/**
 * The Fluent Field Element
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-field>`
 */
export const definition = Field.compose({
  name: `${FluentDesignSystem.prefix}-field`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
