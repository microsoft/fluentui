import { attr, FASTElement, nullableNumberConverter, observable } from '@microsoft/fast-element';
import { getInitials } from '../utilities/get-initials';

/**
 * The Avatar Size
 */
export type AvatarSize = 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

/**
 * The Avatar Shape
 */
export type AvatarShape = 'circular' | 'square';

/**
 * The appearance when "active"
 */
export type AvatarAppearance = 'ring' | 'shadow' | 'ring-shadow';

/**
 * The Avatar Color
 */
export type AvatarColor = 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;

/**
 * A specific named color for the Avatar
 */
export type AvatarNamedColor =
  | 'darkRed'
  | 'cranberry'
  | 'red'
  | 'pumpkin'
  | 'peach'
  | 'marigold'
  | 'gold'
  | 'brass'
  | 'brown'
  | 'forest'
  | 'seafoam'
  | 'darkGreen'
  | 'lightTeal'
  | 'teal'
  | 'steel'
  | 'blue'
  | 'royalBlue'
  | 'cornflower'
  | 'navy'
  | 'lavender'
  | 'purple'
  | 'grape'
  | 'lilac'
  | 'pink'
  | 'magenta'
  | 'plum'
  | 'beige'
  | 'mink'
  | 'platinum'
  | 'anchor';

/**
 * @internal
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
  public name: string;
  private nameChanged(previous: string, next: string): void {
    if (next) {
      this.initials = getInitials(this.name, window.getComputedStyle(this).direction === 'rtl');
    }
  }

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
  public size: AvatarSize = 32;

  /**
   * The avatar can have a circular or square shape.
   *
   * @public
   * @remarks
   * HTML Attribute: shape
   */
  @attr
  public shape: AvatarShape = 'circular';

  /**
   * Optional activity indicator
   * * active: the avatar will be decorated according to activeAppearance
   * * inactive: the avatar will be reduced in size and partially transparent
   * * unset: normal display
   *
   * @public
   * @remarks
   * HTML Attribute: active
   */
  @attr
  public active: 'active' | 'inactive' | undefined;

  /**
   * The appearance when `active="active"`
   *
   * @public
   * @remarks
   * HTML Attribute: appearance
   */
  @attr
  public appearance: AvatarAppearance;

  /**
   * The color when displaying either an icon or initials.
   * * neutral (default): gray
   * * brand: color from the brand palette
   * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or idForColor if provided)
   * * [AvatarNamedColor]: a specific color from the theme
   *
   * @public
   * @remarks
   * HTML Attribute: color
   */
  @attr
  public color: AvatarColor = 'neutral';
  public colorChanged(previous: string, next: string): void {
    this.setColor();
  }

  /**
   * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
   * Use this when a name is not available, but there is another unique identifier that can be used instead.
   */
  @attr({ attribute: 'id-for-color' })
  public idForColor: string | undefined;

  @observable
  public initials: string | undefined = undefined;

  public setColor(): AvatarColor {
    return this.color === 'colorful'
      ? avatarColors[getHashCode(this.idForColor ?? this.name ?? '') % avatarColors.length]
      : this.color;
  }
}

const avatarColors: AvatarNamedColor[] = [
  'darkRed',
  'cranberry',
  'red',
  'pumpkin',
  'peach',
  'marigold',
  'gold',
  'brass',
  'brown',
  'forest',
  'seafoam',
  'darkGreen',
  'lightTeal',
  'teal',
  'steel',
  'blue',
  'royalBlue',
  'cornflower',
  'navy',
  'lavender',
  'purple',
  'grape',
  'lilac',
  'pink',
  'magenta',
  'plum',
  'beige',
  'mink',
  'platinum',
  'anchor',
];

const getHashCode = (str: string): number => {
  let hashCode = 0;
  for (let len: number = str.length - 1; len >= 0; len--) {
    const ch = str.charCodeAt(len);
    const shift = len % 8;
    hashCode ^= (ch << shift) + (ch >> (8 - shift)); // eslint-disable-line no-bitwise
  }

  return hashCode;
};
