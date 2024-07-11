import { FluentDesignSystem } from '../fluent-design-system.js';
import { TextArea } from './textarea.js';
import { styles } from './textarea.styles.js';
import { template } from './textarea.template.js';

/**
 * The Fluent TextInput Element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-text-input>`
 */
export const definition = TextArea.compose({
  name: `${FluentDesignSystem.prefix}-text-area`,
  template,
  styles,
});
