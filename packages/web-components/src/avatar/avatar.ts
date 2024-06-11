import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { getInitials } from '../utils/get-initials.js';
import {
  AvatarActive,
  AvatarAppearance,
  AvatarColor,
  AvatarNamedColor,
  AvatarShape,
  AvatarSize,
} from './avatar.options.js';

/**
 * An Avatar component that represents a user or entity.
 * @extends FASTElement
 *
 * @attr name - The name of the person or entity represented by this Avatar.
 * @attr initials - Provide custom initials rather than one generated via the name.
 * @attr size - Size of the avatar in pixels.
 * @attr shape - The avatar can have a circular or square shape.
 * @attr active - Optional activity indicator.
 * @attr appearance - The appearance when `active="active"`.
 * @attr color - The color when displaying either an icon or initials.
 * @attr color-id - Specify a string to determine which color to use when color="colorful".
 *
 * @csspart icon - The default icon displayed when there is no name or initials.
 * @csspart badge - The badge slot for additional status indicators.
 *
 * @slot - Default slot for the avatar's content.
 * @slot badge - Slot for a badge or status indicator.
 *
 * @summary The Avatar component represents a user or entity.
 *
 * @tag fluent-avatar
 *
 * @public
 */
export class Avatar extends FASTElement {
  /**
   * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public name?: string | undefined;

  /**
   * Provide custom initials rather than one generated via the name
   *
   * @public
   * @remarks
   * HTML Attribute: name
   */
  @attr
  public initials?: string | undefined;

  /**
   * Size of the avatar in pixels.
   *
   * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and
   * based on design guidelines for the Avatar control.
   *
   * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and set `width` and `height`
   * to override the rendered size.
   *
   * @public
   * @remarks
   * HTML Attribute: size
   *
   */
  @attr({ converter: nullableNumberConverter })
  public size?: AvatarSize | undefined;

  /**
   * The avatar can have a circular or square shape.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: AvatarShape | undefined;

  /**
   * Optional activity indicator
   * * active: the avatar will be decorated according to activeAppearance
   * * inactive: the avatar will be reduced in size and partially transparent
   * * undefined: normal display
   *
   * @public
   * @remarks
   * HTML Attribute: active
   */
  @attr
  public active?: AvatarActive | undefined;

  /**
   * The appearance when `active="active"`
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance?: AvatarAppearance | undefined;

  /**
   * The color when displaying either an icon or initials.
   * * neutral (default): gray
   * * brand: color from the brand palette
   * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or colorId if provided)
   * * [AvatarNamedColor]: a specific color from the theme
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color?: AvatarColor = 'neutral';

  /**
   * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
   * Use this when a name is not available, but there is another unique identifier that can be used instead.
   */
  @attr({ attribute: 'color-id' })
  public colorId?: AvatarNamedColor | undefined;

  /**
   * Sets the data-color attribute used for the visual presentation
   * @internal
   */
  public generateColor(): AvatarColor | void {
    if (!this.color) {
      return;
    }

    return this.color === AvatarColor.colorful
      ? (Avatar.colors[getHashCode(this.colorId ?? this.name ?? '') % Avatar.colors.length] as AvatarColor)
      : this.color;
  }

  /**
   * Generates and sets the initials for the template
   * @internal
   */
  public generateInitials(): string | void {
    if (!this.name && !this.initials) {
      return;
    }

    // size can be undefined since we default it in CSS only
    const size = this.size ?? 32;

    return (
      this.initials ??
      getInitials(this.name, window.getComputedStyle(this as unknown as HTMLElement).direction === 'rtl', {
        firstInitialOnly: size <= 16,
      })
    );
  }

  /**
   * An array of the available Avatar named colors
   */
  public static colors = Object.values(AvatarNamedColor);
}

// copied from React avatar
const getHashCode = (str: string): number => {
  let hashCode = 0;
  for (let len: number = str.length - 1; len >= 0; len--) {
    const ch = str.charCodeAt(len);
    const shift = len % 8;
    hashCode ^= (ch << shift) + (ch >> (8 - shift)); // eslint-disable-line no-bitwise
  }

  return hashCode;
};
