import { PersonaInitialsColor, IPersonaProps } from './Persona.types';

/**
 * These colors are considered reserved colors and can only be set with overrides:
 * - Red is a color that often has a special meaning.
 * - Transparent is not intended to be used with typical initials due to accessibility issues,
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
      return '#99B433';
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
    case PersonaInitialsColor.black:
      return '#1D1D1D';
    case PersonaInitialsColor.orange:
      return '#DA532C';
    case PersonaInitialsColor.red:
      return '#EE1111';
    case PersonaInitialsColor.darkRed:
      return '#B91D47';
    case PersonaInitialsColor.transparent:
      return 'transparent';
    case PersonaInitialsColor.violet:
      return '#5E4B8B';
  }
}

export function initialsColorPropToColorCode(props: IPersonaProps): string {
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
