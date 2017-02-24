import {
  PersonaInitialsColor,
  PersonaPresence,
  PersonaSize
} from './Persona.Props';
import styles from './Persona.scss';

export const PERSONA_SIZE = {
  [PersonaSize.tiny]: 'ms-Persona--tiny ' + styles.isRootTiny,
  [PersonaSize.extraExtraSmall]: 'ms-Persona--xxs ' + styles.isRootExtraExtraSmall,
  [PersonaSize.extraSmall]: 'ms-Persona--xs ' + styles.isRootExtraSmall,
  [PersonaSize.small]: 'ms-Persona--sm ' + styles.isRootSmall,
  [PersonaSize.regular]: '',
  [PersonaSize.large]: 'ms-Persona--lg ' + styles.isRootLarge,
  [PersonaSize.extraLarge]: 'ms-Persona--xl ' + styles.isRootExtraLarge
};

export const PERSONA_PRESENCE = {
  [PersonaPresence.offline]: 'ms-Persona--offline ' + styles.isRootOffline,
  [PersonaPresence.online]: 'ms-Persona--online ',
  [PersonaPresence.away]: 'ms-Persona--away ' + styles.isRootAway,
  [PersonaPresence.dnd]: 'ms-Persona--dnd ' + styles.isRootDoNotDisturb,
  [PersonaPresence.blocked]: 'ms-Persona--blocked ' + styles.isRootBlocked,
  [PersonaPresence.busy]: 'ms-Persona--busy ' + styles.isRootBusy
};

export const PERSONA_INITIALS_COLOR = {
  [PersonaInitialsColor.lightBlue]: 'ms-Persona-initials--lightBlue ' + styles.isRootInitialsLightBlue,
  [PersonaInitialsColor.blue]: 'ms-Persona-initials--blue ' + styles.isRootInitialsBlue,
  [PersonaInitialsColor.darkBlue]: 'ms-Persona-initials--darkBlue ' + styles.isRootInitialsDarkBlue,
  [PersonaInitialsColor.teal]: 'ms-Persona-initials--teal ' + styles.isRootInitialsTeal,
  [PersonaInitialsColor.lightGreen]: 'ms-Persona-initials--lightGreen ' + styles.isRootInitialsLightGreen,
  [PersonaInitialsColor.green]: 'ms-Persona-initials--green ' + styles.isRootInitialsGreen,
  [PersonaInitialsColor.darkGreen]: 'ms-Persona-initials--darkGreen ' + styles.isRootInitialsDarkGreen,
  [PersonaInitialsColor.lightPink]: 'ms-Persona-initials--lightPink ' + styles.isRootInitialsLightPink,
  [PersonaInitialsColor.pink]: 'ms-Persona-initials--pink ' + styles.isRootInitialsPink,
  [PersonaInitialsColor.magenta]: 'ms-Persona-initials--magenta ' + styles.isRootInitialsMagenta,
  [PersonaInitialsColor.purple]: 'ms-Persona-initials--purple ' + styles.isRootInitialsPurple,
  [PersonaInitialsColor.black]: 'ms-Persona-initials--black ' + styles.isRootInitialsBlack,
  [PersonaInitialsColor.orange]: 'ms-Persona-initials--orange ' + styles.isRootInitialsGreen,
  [PersonaInitialsColor.red]: 'ms-Persona-initials--red ' + styles.isRootInitialsRed,
  [PersonaInitialsColor.darkRed]: 'ms-Persona-initials--darkRed ' + styles.isRootInitialsDarkRed
};