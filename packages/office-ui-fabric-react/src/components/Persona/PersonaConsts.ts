import {
  PersonaInitialsColor,
  PersonaPresence,
  PersonaSize
} from './Persona.Props';
import * as stylesImport from './Persona.scss';
const styles: any = stylesImport;

export const PERSONA_SIZE = {
  [PersonaSize.tiny]: 'ms-Persona--tiny ' + styles.rootIsTiny,
  [PersonaSize.extraExtraSmall]: 'ms-Persona--xxs ' + styles.rootIsExtraExtraSmall,
  [PersonaSize.extraSmall]: 'ms-Persona--xs ' + styles.rootIsExtraSmall,
  [PersonaSize.small]: 'ms-Persona--sm ' + styles.rootIsSmall,
  [PersonaSize.regular]: '',
  [PersonaSize.large]: 'ms-Persona--lg ' + styles.rootIsLarge,
  [PersonaSize.extraLarge]: 'ms-Persona--xl ' + styles.rootIsExtraLarge,
  [PersonaSize.size28]: 'ms-Persona--28 ' + styles.rootIs28,
  [PersonaSize.size16]: 'ms-Persona--16 ' + styles.rootIs16,
  [PersonaSize.size12]: 'ms-Persona--12 ' + styles.rootIs12,
  [PersonaSize.size24]: 'ms-Persona--24 ' + styles.rootIs24,
  [PersonaSize.size32]: 'ms-Persona--32 ' + styles.rootIs32,
  [PersonaSize.size40]: 'ms-Persona--40 ' + styles.rootIs40,
  [PersonaSize.size48]: 'ms-Persona--48 ' + styles.rootIs48,
  [PersonaSize.size72]: 'ms-Persona--72 ' + styles.rootIs72,
  [PersonaSize.size100]: 'ms-Persona--100 ' + styles.rootIs100
};

export const PERSONA_PRESENCE = {
  [PersonaPresence.offline]: 'ms-Persona--offline ' + styles.rootIsOffline,
  [PersonaPresence.online]: 'ms-Persona--online ',
  [PersonaPresence.away]: 'ms-Persona--away ' + styles.rootIsAway,
  [PersonaPresence.dnd]: 'ms-Persona--dnd ' + styles.rootIsDoNotDisturb,
  [PersonaPresence.blocked]: 'ms-Persona--blocked ' + styles.rootIsBlocked,
  [PersonaPresence.busy]: 'ms-Persona--busy ' + styles.rootIsBusy
};

export const PERSONA_INITIALS_COLOR = {
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
  [PersonaInitialsColor.darkRed]: 'ms-Persona-initials--darkRed ' + styles.initialsIsDarkRed
};