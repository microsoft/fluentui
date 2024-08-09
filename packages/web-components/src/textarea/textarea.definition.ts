import { FluentDesignSystem } from '../fluent-design-system.js';
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
  name: `${FluentDesignSystem.prefix}-textarea`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
