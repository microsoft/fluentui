import { KumoAvatar } from './avatar.js';
import { styles } from './avatar.styles.js';
import { template } from './avatar.template.js';

/**
 * The Fluent Avatar Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export const definition = KumoAvatar.compose({
  name: `kumo-avatar`,
  template,
  styles,
});
