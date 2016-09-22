import {
  PersonaInitialsColor,
  PersonaPresence,
  PersonaSize
} from './Persona.Props';

export const PERSONA_SIZE = {
  [PersonaSize.tiny]: 'ms-Persona--tiny',
  [PersonaSize.extraSmall]: 'ms-Persona--xs',
  [PersonaSize.small]: 'ms-Persona--sm',
  [PersonaSize.regular]: '',
  [PersonaSize.large]: 'ms-Persona--lg',
  [PersonaSize.extraLarge]: 'ms-Persona--xl'
};

export const PERSONA_PRESENCE = {
  [PersonaPresence.offline]: 'ms-Persona--offline',
  [PersonaPresence.online]: 'ms-Persona--online',
  [PersonaPresence.away]: 'ms-Persona--away',
  [PersonaPresence.dnd]: 'ms-Persona--dnd',
  [PersonaPresence.blocked]: 'ms-Persona--blocked',
  [PersonaPresence.busy]: 'ms-Persona--busy'
};

export const PERSONA_INITIALS_COLOR = {
  [PersonaInitialsColor.lightBlue]: 'ms-Persona-initials--lightBlue',
  [PersonaInitialsColor.blue]: 'ms-Persona-initials--blue',
  [PersonaInitialsColor.darkBlue]: 'ms-Persona-initials--darkBlue',
  [PersonaInitialsColor.teal]: 'ms-Persona-initials--teal',
  [PersonaInitialsColor.lightGreen]: 'ms-Persona-initials--lightGreen',
  [PersonaInitialsColor.green]: 'ms-Persona-initials--green',
  [PersonaInitialsColor.darkGreen]: 'ms-Persona-initials--darkGreen',
  [PersonaInitialsColor.lightPink]: 'ms-Persona-initials--lightPink',
  [PersonaInitialsColor.pink]: 'ms-Persona-initials--pink',
  [PersonaInitialsColor.magenta]: 'ms-Persona-initials--magenta',
  [PersonaInitialsColor.purple]: 'ms-Persona-initials--purple',
  [PersonaInitialsColor.black]: 'ms-Persona-initials--black',
  [PersonaInitialsColor.orange]: 'ms-Persona-initials--orange',
  [PersonaInitialsColor.red]: 'ms-Persona-initials--red',
  [PersonaInitialsColor.darkRed]: 'ms-Persona-initials--darkRed'
};