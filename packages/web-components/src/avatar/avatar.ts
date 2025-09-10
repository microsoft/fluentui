import { attr, nullableNumberConverter, Observable } from '@microsoft/fast-element';
import { getInitials } from '../utils/get-initials.js';
import { BaseAvatar } from './avatar.base.js';
import {
  type AvatarActive,
  type AvatarAppearance,
  AvatarColor,
  AvatarNamedColor,
  type AvatarShape,
  type AvatarSize,
} from './avatar.options.js';

/**
 * An Avatar Custom HTML Element.
 * Based on BaseAvatar and includes style and layout specific attributes
 *
 * @tag fluent-avatar
 *
 * @public
 */
export class Avatar extends BaseAvatar {
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
   * The avatar can have a circular or square shape.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape?: AvatarShape | undefined;

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
  public color?: AvatarColor | undefined;

  /**
   * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
   * Use this when a name is not available, but there is another unique identifier that can be used instead.
   */
  @attr({ attribute: 'color-id' })
  public colorId?: AvatarNamedColor | undefined;

  /**
   * Holds the current color state
   */
  private currentColor: AvatarColor | undefined;

  /**
   * Handles changes to observable properties
   * @internal
   * @param source - the source of the change
   * @param propertyName - the property name being changed
   */
  public handleChange(source: any, propertyName: string) {
    switch (propertyName) {
      case 'color':
      case 'colorId':
        this.generateColor();
        break;
      default:
        break;
    }
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
   * Sets the data-color attribute used for the visual presentation
   * @internal
   */
  public generateColor(): void {
    const colorful: boolean = this.color === AvatarColor.colorful;
    const prev = this.currentColor;

    this.currentColor =
      colorful && this.colorId
        ? this.colorId
        : colorful
        ? (Avatar.colors[getHashCode(this.name ?? '') % Avatar.colors.length] as AvatarColor)
        : this.color ?? AvatarColor.neutral;

    this.setAttribute('data-color', this.currentColor);
  }

  /**
   * An array of the available Avatar named colors
   */
  public static colors = Object.values(AvatarNamedColor);

  public connectedCallback(): void {
    super.connectedCallback();

    Observable.getNotifier(this).subscribe(this);

    this.generateColor();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    Observable.getNotifier(this).unsubscribe(this);
  }
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
