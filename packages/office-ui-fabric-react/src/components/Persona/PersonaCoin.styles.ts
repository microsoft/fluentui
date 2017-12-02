import { PersonaInitialsColor } from './Persona.types';
import { mergeStyles } from '../../Styling';
import { getInitialsColorFromName } from './getInitialsColorFromName';

function getInitialsColorCode(personaInitialsColor: PersonaInitialsColor | undefined, primaryText: string | undefined): string {
  let initialsColor = personaInitialsColor !== undefined ? personaInitialsColor : getInitialsColorFromName(primaryText);

  switch (initialsColor) {
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
      return ' #7E3878';
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
  }
}

export function getInitialsColorClassName(personaInitialsColor: PersonaInitialsColor | undefined, primaryText: string | undefined): string {
  return mergeStyles({
    backgroundColor: getInitialsColorCode(personaInitialsColor, primaryText)
  });
}