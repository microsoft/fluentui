import { PersonaPresence, PersonaSize } from './Persona.types';

// Persona Sizes
export namespace personaSize {
  export const size8 = '20px';
  // TODO: remove in a future major release as it's deprecated.
  export const size10 = '20px';
  // TODO: remove in a future major release as it's deprecated.
  export const size16 = '16px';
  export const size24 = '24px';
  // TODO: remove in a future major release as it's deprecated.
  export const size28 = '28px';
  export const size32 = '32px';
  export const size40 = '40px';
  export const size48 = '48px';
  export const size56 = '56px';
  export const size72 = '72px';
  export const size100 = '100px';
  export const size120 = '120px';
}

// Persona Presence Sizes
export namespace personaPresenceSize {
  export const size6 = '6px';
  export const size8 = '8px';
  export const size12 = '12px';
  export const size16 = '16px';
  export const size20 = '20px';
  export const size28 = '28px';
  export const size32 = '32px';

  /**
   * @deprecated This is now unused
   */
  export const border = '2px';
}

// TODO: remove the deprecated parts in a future major release.
export const sizeBoolean = (size: PersonaSize) => ({
  isSize8: size === PersonaSize.size8,
  /* eslint-disable deprecation/deprecation */
  isSize10: size === PersonaSize.size10 || size === PersonaSize.tiny,
  isSize16: size === PersonaSize.size16,
  isSize24: size === PersonaSize.size24 || size === PersonaSize.extraExtraSmall,
  isSize28: size === PersonaSize.size28 || size === PersonaSize.extraSmall,
  isSize32: size === PersonaSize.size32,
  isSize40: size === PersonaSize.size40 || size === PersonaSize.small,
  isSize48: size === PersonaSize.size48 || size === PersonaSize.regular,
  isSize56: size === PersonaSize.size56,
  isSize72: size === PersonaSize.size72 || size === PersonaSize.large,
  isSize100: size === PersonaSize.size100 || size === PersonaSize.extraLarge,
  isSize120: size === PersonaSize.size120,
});

export const sizeToPixels: { [key: number]: number } = {
  // Old deprecated sizes
  [PersonaSize.tiny]: 10,
  [PersonaSize.extraExtraSmall]: 24,
  [PersonaSize.extraSmall]: 28,
  [PersonaSize.small]: 40,
  [PersonaSize.regular]: 48,
  [PersonaSize.large]: 72,
  [PersonaSize.extraLarge]: 100,
  // New sizes
  [PersonaSize.size8]: 8,
  [PersonaSize.size10]: 10, // TODO: deprecated (not in the design specs)
  [PersonaSize.size16]: 16, // TODO: deprecated (not in the design specs)
  [PersonaSize.size24]: 24,
  [PersonaSize.size28]: 28, // TODO: deprecated (not in the design specs)
  /* eslint-enable deprecation/deprecation */
  [PersonaSize.size32]: 32,
  [PersonaSize.size40]: 40,
  [PersonaSize.size48]: 48,
  [PersonaSize.size56]: 56,
  [PersonaSize.size72]: 72,
  [PersonaSize.size100]: 100,
  [PersonaSize.size120]: 120,
};

export const presenceBoolean = (presence: PersonaPresence) => ({
  isAvailable: presence === PersonaPresence.online,
  isAway: presence === PersonaPresence.away,
  isBlocked: presence === PersonaPresence.blocked,
  isBusy: presence === PersonaPresence.busy,
  isDoNotDisturb: presence === PersonaPresence.dnd,
  isOffline: presence === PersonaPresence.offline,
});
