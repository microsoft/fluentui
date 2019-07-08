import { PersonaInitialsColor, IPersonaProps } from './Persona.types';

/**
 * Following colors are considered reserved colors and can only be set with overrides, so they are excluded from this set:
 * - `gray` and `black` are colors that can result in offensive persona coins with some initials combinations,
 *   so it can only be set with overrides.
 * - `red` is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides.
 * - `transparent` is not intended to be used with typical initials due to accessibility issues,
 *   its primary use is for Facepile overflow buttons.
 */
const COLOR_SWATCHES_LOOKUP: PersonaInitialsColor[] = [
  PersonaInitialsColor.lightGreen,
  PersonaInitialsColor.lightBlue,
  PersonaInitialsColor.lightPink,
  PersonaInitialsColor.green,
  PersonaInitialsColor.darkGreen,
  PersonaInitialsColor.pink,
  PersonaInitialsColor.magenta,
  PersonaInitialsColor.purple,
  PersonaInitialsColor.violet,
  PersonaInitialsColor.teal,
  PersonaInitialsColor.blue,
  PersonaInitialsColor.darkBlue,
  PersonaInitialsColor.orange,
  PersonaInitialsColor.darkRed
];

const COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length;

function getInitialsColorFromName(displayName: string | undefined): PersonaInitialsColor {
  let color = PersonaInitialsColor.blue;
  if (!displayName) {
    return color;
  }

  let hashCode = 0;
  for (let iLen: number = displayName.length - 1; iLen >= 0; iLen--) {
    const ch: number = displayName.charCodeAt(iLen);
    const shift: number = iLen % 8;
    // tslint:disable-next-line:no-bitwise
    hashCode ^= (ch << shift) + (ch >> (8 - shift));
  }

  color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES];

  return color;
}

function personaInitialsColorToHexCode(personaInitialsColor: PersonaInitialsColor): string {
  switch (personaInitialsColor) {
    case PersonaInitialsColor.lightBlue:
      return '#6BA5E7';
    case PersonaInitialsColor.blue:
      return '#2D89EF';
    case PersonaInitialsColor.darkBlue:
      return '#2B5797';
    case PersonaInitialsColor.teal:
      return '#00ABA9';
    case PersonaInitialsColor.lightGreen:
    case PersonaInitialsColor.green:
      return '#00A300';
    case PersonaInitialsColor.darkGreen:
      return '#1E7145';
    case PersonaInitialsColor.lightPink:
      return '#E773BD';
    case PersonaInitialsColor.pink:
      return '#FF0097';
    case PersonaInitialsColor.magenta:
      return '#7E3878';
    case PersonaInitialsColor.purple:
      return '#603CBA';
    case PersonaInitialsColor.orange:
      return '#DA532C';
    case PersonaInitialsColor.red:
      return '#EE1111';
    case PersonaInitialsColor.lightRed:
      return '#D13438';
    case PersonaInitialsColor.darkRed:
      return '#B91D47';
    case PersonaInitialsColor.transparent:
      return 'transparent';
    case PersonaInitialsColor.violet:
      return '#5E4B8B';
    case PersonaInitialsColor.gold:
      return '#986F0B';
    case PersonaInitialsColor.burgundy:
      return '#750B1C';
    case PersonaInitialsColor.warmGray:
      return '#7A7574';
    case PersonaInitialsColor.cyan:
      return '#005B70';
    case PersonaInitialsColor.rust:
      return '#8E562E';
    case PersonaInitialsColor.coolGray:
      return '#69797E';
    case PersonaInitialsColor.black:
      return '#1D1D1D';
    case PersonaInitialsColor.gray:
      return '#393939';
  }
}

/** @deprecated Use `getPersonaInitialsColor` */
export function initialsColorPropToColorCode(props: IPersonaProps): string {
  return getPersonaInitialsColor(props);
}

/**
 * Gets the hex color string (prefixed with #) for the given persona props.
 * This is the logic used internally by the Persona control.
 * @param props - Current persona props
 * @returns Hex color string prefixed with #
 */
export function getPersonaInitialsColor(props: Pick<IPersonaProps, 'primaryText' | 'text' | 'initialsColor'>): string {
  const { primaryText, text } = props;
  let { initialsColor } = props;
  let initialsColorCode: string;
  if (typeof initialsColor === 'string') {
    initialsColorCode = initialsColor;
  } else {
    initialsColor = initialsColor !== undefined ? initialsColor : getInitialsColorFromName(text || primaryText);
    initialsColorCode = personaInitialsColorToHexCode(initialsColor);
  }

  return initialsColorCode;
}
