import { tagName } from './textarea.options.js';
import { TextArea } from './textarea.js';
import { styles } from './textarea.styles.js';
import { template } from './textarea.template.js';

/**
 * The Fluent Textarea Element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-textarea>`
 */
export const definition = TextArea.compose({
  name: tagName,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
