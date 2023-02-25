import { FluentDesignSystem } from '../fluent-design-system.js';
import { Avatar } from './avatar.js';
import { styles } from './avatar.styles.js';
import { template } from './avatar.template.js';

/**
 * The Fluent Avatar Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const definition = Avatar.compose({
  name: `${FluentDesignSystem.prefix}-avatar`,
  template,
  styles,
});
