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
  PersonaInitialsColor.black,
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
      return '#4F6BED';
    case PersonaInitialsColor.blue:
      return '#0078D4';
    case PersonaInitialsColor.darkBlue:
      return '#004E8C';
    case PersonaInitialsColor.teal:
      return '#038387';
    case PersonaInitialsColor.lightGreen:
      return '#498205';
    case PersonaInitialsColor.green:
      return '#498205';
    case PersonaInitialsColor.darkGreen:
      return '#0B6A0B';
    case PersonaInitialsColor.lightPink:
      return '#C239B3';
    case PersonaInitialsColor.pink:
      return '#E3008C';
    case PersonaInitialsColor.magenta:
      return ' #881798';
    case PersonaInitialsColor.purple:
      return '#5C2E91';
    case PersonaInitialsColor.black:
      return '#1D1D1D';
    case PersonaInitialsColor.orange:
      return '#CA5010';
    case PersonaInitialsColor.red:
      return '#EE1111';
    case PersonaInitialsColor.darkRed:
      return '#A4262C';
    case PersonaInitialsColor.transparent:
      return 'transparent';
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