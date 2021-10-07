import { Avatar, AvatarOptions, avatarTemplate as template } from '@microsoft/fast-foundation';
import { avatarStyles as styles } from './avatar.styles';

/**
 * The Fluent Avatar Element. Implements {@link @microsoft/fast-foundation#Avatar},
 * {@link @microsoft/fast-foundation#avatarTemplate}
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: \<fluent-avatar\>
 */
export const fluentAvatar = Avatar.compose<AvatarOptions>({
  baseName: 'avatar',
  template,
  styles,
  shadowOptions: {
    delegatesFocus: true,
  },
});

/**
 * Styles for Avatar
 * @public
 */
export const avatarStyles = styles;

/**
 * Base class for Avatar
 * @public
 */
export { Avatar };
