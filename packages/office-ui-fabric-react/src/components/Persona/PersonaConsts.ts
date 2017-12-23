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