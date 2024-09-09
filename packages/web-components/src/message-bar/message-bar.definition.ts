import { FluentDesignSystem } from '../fluent-design-system.js';
import { MessageBar } from './message-bar.js';
import { styles } from './message-bar.styles.js';
import { template } from './message-bar.template.js';

/**
 * The Fluent MessageBar Element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<fluent-message-bar>`
 */
export const definition = MessageBar.compose({
  name: `${FluentDesignSystem.prefix}-message-bar`,
  template,
  styles,
  shadowOptions: {
    mode: FluentDesignSystem.shadowRootMode,
  },
});
