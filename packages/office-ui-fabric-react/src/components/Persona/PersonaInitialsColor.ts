import { PersonaInitialsColor, IPersonaProps } from './Persona.types';

/**
 * These colors are considered reserved colors and can only be set with overrides:
 * - Red is a color that often has a special meaning.
 * - Transparent is not intended to be used with typical initials due to accessibility issues,
 *   its primary use is for Facepile overflow buttons.
 */
const COLOR_SWATCHES_LOOKUP: PersonaInitialsColor[] = [
  PersonaInitialsColor.green10,
  PersonaInitialsColor.darkGreen20,
  PersonaInitialsColor.teal10,
  PersonaInitialsColor.cyan30,
  PersonaInitialsColor.lightBlue30,
  PersonaInitialsColor.blue20,
  PersonaInitialsColor.darkBlue10,
  PersonaInitialsColor.violet10,
  PersonaInitialsColor.purple10,
  PersonaInitialsColor.magenta10,
  PersonaInitialsColor.lightPink10,
  PersonaInitialsColor.pink10,
  PersonaInitialsColor.pinkRed10,
  PersonaInitialsColor.red10,
  PersonaInitialsColor.darkRed20,
  PersonaInitialsColor.orange10,
  PersonaInitialsColor.orange30,
  PersonaInitialsColor.orangeYellow20,
  PersonaInitialsColor.gray30,
  PersonaInitialsColor.gray20
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
    case PersonaInitialsColor.lightBlue30:
      return '#4F6BED';
    case PersonaInitialsColor.blue:
    case PersonaInitialsColor.blue20:
      return '#0078D4';
    case PersonaInitialsColor.darkBlue:
    case PersonaInitialsColor.darkBlue10:
      return '#004E8C';
    case PersonaInitialsColor.teal:
    case PersonaInitialsColor.teal10:
      return '#038387';
    case PersonaInitialsColor.lightGreen:
    case PersonaInitialsColor.green:
    case PersonaInitialsColor.green10:
      return '#498205';
    case PersonaInitialsColor.darkGreen:
    case PersonaInitialsColor.darkGreen20:
      return '#0B6A0B';
    case PersonaInitialsColor.lightPink:
    case PersonaInitialsColor.lightPink10:
      return '#C239B3';
    case PersonaInitialsColor.pink:
    case PersonaInitialsColor.pink10:
      return '#E3008C';
    case PersonaInitialsColor.magenta:
    case PersonaInitialsColor.magenta10:
      return '#881798';
    case PersonaInitialsColor.purple:
    case PersonaInitialsColor.purple10:
      return '#5C2E91';
    case PersonaInitialsColor.orange:
    case PersonaInitialsColor.orange10:
      return '#CA5010';
    case PersonaInitialsColor.red:
    case PersonaInitialsColor.red10:
      return '#D13438';
    case PersonaInitialsColor.darkRed:
    case PersonaInitialsColor.darkRed20:
      return '#A4262C';
    case PersonaInitialsColor.transparent:
      return 'transparent';
    case PersonaInitialsColor.violet:
    case PersonaInitialsColor.violet10:
      return '#8764B8';
    case PersonaInitialsColor.orangeYellow20:
      return '#986F0B';
    case PersonaInitialsColor.pinkRed10:
      return '#750B1C';
    case PersonaInitialsColor.gray30:
      return '#7A7574';
    case PersonaInitialsColor.cyan30:
      return '#005B70';
    case PersonaInitialsColor.orange30:
      return '#8E562E';
    case PersonaInitialsColor.gray20:
      return '#69797E';
    case PersonaInitialsColor.black:
    case PersonaInitialsColor.gray40:
      return '#393939';
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
