import { customElement } from '@microsoft/fast-element';
import { Avatar } from './avatar';
import { avatarTemplate as template } from './avatar.template';
import { avatarStyles as styles } from './avatar.styles';

/**
 * THe Avatar component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-avatar>`
 */
@customElement({
  name: 'fluent-avatar',
  template,
  styles,
})
export class FluentAvatar extends Avatar {}
