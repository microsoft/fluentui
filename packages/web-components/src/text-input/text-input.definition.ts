import { tagName } from './text-input.options.js';
import { TextInput } from './text-input.js';
import { styles } from './text-input.styles.js';
import { template } from './text-input.template.js';

/**
 * The Fluent TextInput Element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-text-input>`
 */
export const definition = TextInput.compose({
  name: tagName,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
