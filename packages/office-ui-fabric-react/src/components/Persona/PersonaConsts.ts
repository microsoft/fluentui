import {
  PersonaInitialsColor,
  PersonaPresence,
  PersonaSize
} from './Persona.types';
import * as stylesImport from './Persona.scss';
const styles: any = stylesImport;

export const PERSONA_SIZE: { [key: number]: string } = {
  // All non-numerically named sizes are deprecated, use the numerically named classes below
  [PersonaSize.tiny]: 'ms-Persona--tiny ' + styles.rootIsSize10,
  [PersonaSize.extraExtraSmall]: 'ms-Persona--xxs ' + styles.rootIsSize24,
  [PersonaSize.extraSmall]: 'ms-Persona--xs ' + styles.rootIsSize28,
  [PersonaSize.small]: 'ms-Persona--sm ' + styles.rootIsSize40,
  [PersonaSize.regular]: '',
  [PersonaSize.large]: 'ms-Persona--lg ' + styles.rootIsSize72,
  [PersonaSize.extraLarge]: 'ms-Persona--xl ' + styles.rootIsSize100,

  [PersonaSize.size10]: 'ms-Persona--size10 ' + styles.rootIsSize10,
  [PersonaSize.size16]: 'ms-Persona--size16 ' + styles.rootIsSize16,
  [PersonaSize.size24]: 'ms-Persona--size24 ' + styles.rootIsSize24,
  [PersonaSize.size28]: 'ms-Persona--size28 ' + styles.rootIsSize28,
  [PersonaSize.size32]: 'ms-Persona--size32 ' + styles.rootIsSize32,
  [PersonaSize.size40]: 'ms-Persona--size40 ' + styles.rootIsSize40,
  [PersonaSize.size48]: 'ms-Persona--size48 ' + styles.rootIsSize48,
  [PersonaSize.size72]: 'ms-Persona--size72 ' + styles.rootIsSize72,
  [PersonaSize.size100]: 'ms-Persona--size100 ' + styles.rootIsSize100
};

export const PERSONA_PRESENCE: { [key: number]: string } = {
  [PersonaPresence.offline]: 'ms-Persona--offline ' + styles.rootIsOffline,
  [PersonaPresence.online]: 'ms-Persona--online ',
  [PersonaPresence.away]: 'ms-Persona--away ' + styles.rootIsAway,
  [PersonaPresence.dnd]: 'ms-Persona--dnd ' + styles.rootIsDoNotDisturb,
  [PersonaPresence.blocked]: 'ms-Persona--blocked ' + styles.rootIsBlocked,
  [PersonaPresence.busy]: 'ms-Persona--busy ' + styles.rootIsBusy
};

export const PERSONA_INITIALS_COLOR: { [key: number]: string } = {
  [PersonaInitialsColor.lightBlue]: 'ms-Persona-initials--lightBlue ' + styles.initialsIsLightBlue,
  [PersonaInitialsColor.blue]: 'ms-Persona-initials--blue ' + styles.initialsIsBlue,
  [PersonaInitialsColor.darkBlue]: 'ms-Persona-initials--darkBlue ' + styles.initialsIsDarkBlue,
  [PersonaInitialsColor.teal]: 'ms-Persona-initials--teal ' + styles.initialsIsTeal,
  [PersonaInitialsColor.lightGreen]: 'ms-Persona-initials--lightGreen ' + styles.initialsIsLightGreen,
  [PersonaInitialsColor.green]: 'ms-Persona-initials--green ' + styles.initialsIsGreen,
  [PersonaInitialsColor.darkGreen]: 'ms-Persona-initials--darkGreen ' + styles.initialsIsDarkGreen,
  [PersonaInitialsColor.lightPink]: 'ms-Persona-initials--lightPink ' + styles.initialsIsLightPink,
  [PersonaInitialsColor.pink]: 'ms-Persona-initials--pink ' + styles.initialsIsPink,
  [PersonaInitialsColor.magenta]: 'ms-Persona-initials--magenta ' + styles.initialsIsMagenta,
  [PersonaInitialsColor.purple]: 'ms-Persona-initials--purple ' + styles.initialsIsPurple,
  [PersonaInitialsColor.black]: 'ms-Persona-initials--black ' + styles.initialsIsBlack,
  [PersonaInitialsColor.orange]: 'ms-Persona-initials--orange ' + styles.initialsIsOrange,
  [PersonaInitialsColor.red]: 'ms-Persona-initials--red ' + styles.initialsIsRed,
  [PersonaInitialsColor.darkRed]: 'ms-Persona-initials--darkRed ' + styles.initialsIsDarkRed,
  [PersonaInitialsColor.transparent]: 'ms-Persona-initials--transparent ' + styles.initialsIsTransparent
};