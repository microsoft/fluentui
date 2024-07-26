import { BaseAvatar } from '../../avatar/avatar.js';
import { styles } from './avatar.styles.js';
import { template } from './avatar.template.js';

/**
 * The Fluent Avatar Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const definition = BaseAvatar.compose({
  name: `kumo-avatar`,
  template,
  styles,
});
