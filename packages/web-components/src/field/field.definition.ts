import { tagName } from './field.options.js';
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
  name: tagName,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
