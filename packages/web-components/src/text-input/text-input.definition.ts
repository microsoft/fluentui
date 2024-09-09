import { FluentDesignSystem } from '../fluent-design-system.js';
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
  name: `${FluentDesignSystem.prefix}-text-input`,
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});
