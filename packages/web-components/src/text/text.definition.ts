import { tagName } from './text.options.js';
import { Text } from './text.js';
import { styles } from './text.styles.js';
import { template } from './text.template.js';

/**
 * The Fluent Text Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text\>
 */
export const definition = Text.compose({
  name: tagName,
  template,
  styles,
});
