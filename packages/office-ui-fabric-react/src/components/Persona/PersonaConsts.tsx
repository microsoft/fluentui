import {
  PersonaPresence,
  PersonaSize,
} from './Persona.types';

// Persona Sizes
export namespace personaSize {
  export const size10 = '20px';
  export const size16 = '16px';
  export const size24 = '24px';
  export const size28 = '28px';
  export const size32 = '32px';
  export const size40 = '40px';
  export const size48 = '48px';
  export const size72 = '72px';
  export const size100 = '100px';
}

// Persona Presence Sizes
export namespace personaPresenceSize {
  export const size6 = '6px';
  export const size8 = '8px';
  export const size12 = '12px';
  export const size20 = '20px';
  export const size28 = '28px';
  export const border = '2px';
}

export const sizeBoolean = (size: PersonaSize) => ({
  isSize10: size === PersonaSize.size10 || size === PersonaSize.tiny,
  isSize16: size === PersonaSize.size16,
  isSize24: size === PersonaSize.size24 || size === PersonaSize.extraExtraSmall,
  isSize28: size === PersonaSize.size28 || size === PersonaSize.extraSmall,
  isSize32: size === PersonaSize.size32,
  isSize40: size === PersonaSize.size40 || size === PersonaSize.small,
  isSize48: size === PersonaSize.size48,
  isSize72: size === PersonaSize.size72 || size === PersonaSize.large,
  isSize100: size === PersonaSize.size100 || size === PersonaSize.extraLarge,
});

export const presenceBoolean = (presence: PersonaPresence) => ({
  isAvailable: presence === PersonaPresence.online,
  isAway: presence === PersonaPresence.away,
  isBlocked: presence === PersonaPresence.blocked,
  isBusy: presence === PersonaPresence.busy,
  isDoNotDisturb: presence === PersonaPresence.dnd,
  isOffline: presence === PersonaPresence.offline,
});
