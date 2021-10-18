import { parseColorHexRGB } from '@microsoft/fast-colors';
import { attr } from '@microsoft/fast-element';
import {
  AvatarOptions,
  DesignToken,
  Avatar as FoundationAvatar,
  avatarTemplate as template,
} from '@microsoft/fast-foundation';
import { accentPalette } from '../design-tokens';
import { SwatchRGB } from '../color/swatch';
import { PaletteRGB } from '../color/palette';
import { avatarStyles as styles } from './avatar.styles';

/** @public */
export const avatarSize = DesignToken.create<number>('avatar-size').withDefault(32);

/**
 * Avatar appearances
 * @public
 */
export type AvatarAppearance = 'neutral' | 'accent';

/**
 * The FAST Avatar Class
 * @public
 *
 */
export class Avatar extends FoundationAvatar {
  /**
   * Source color for the avatar component. Sets context for the design system.
   *
   * Updates the accent palette and sets the avatar to the source color.
   * @public
   * @remarks
   * HTML Attribute: accent-source-color
   */
  @attr({
    attribute: 'accent-source-color',
    mode: 'fromView',
  })
  public accentSourceColor: string;
  private accentSourceColorChanged(prev: string | void, next: string | void): void {
    if (next) {
      const parsedColor = parseColorHexRGB(next);

      if (parsedColor !== null) {
        const swatch = SwatchRGB.from(parsedColor);
        accentPalette.setValueFor(this, PaletteRGB.create(swatch));
      }
    } else {
      accentPalette.deleteValueFor(this);
    }
  }

  /**
   * The appearance of the element.
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: AvatarAppearance = 'neutral';
}

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
  baseClass: FoundationAvatar,
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
