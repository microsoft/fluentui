import * as React from 'react';

const avatarContext = React.createContext<AvatarContextValue | undefined>(undefined);

/**
 * @internal
 */
export interface AvatarContextValue {
  size?: number;
}

const avatarContextDefaultValue: AvatarContextValue = {};

/**
 * @internal
 */
export const AvatarContextProvider = avatarContext.Provider;

/**
 * @internal
 */
export const useAvatarContext = () => React.useContext(avatarContext) ?? avatarContextDefaultValue;
