import { FluentDesignSystem } from '../fluent-design-system.js';
import { Text } from './text-input.js';
import { styles } from './text-input.styles.js';
import { template } from './text-input.template.js';

/**
 * The Fluent TextInput Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-input\>
 */
export const definition = Text.compose({
  name: `${FluentDesignSystem.prefix}-text-input`,
  template,
  styles,
});
