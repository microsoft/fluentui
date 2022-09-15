import * as React from 'react';

const avatarContext = React.createContext<AvatarContextValue | undefined>(undefined);

/**
 * Sizes that can be used for the Avatar
 * Copied from the react-avatar package, if the sizes are incompatible then TS should fail
 */
type AvatarSizes = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

/**
 * @internal
 */
export interface AvatarContextValue {
  size?: AvatarSizes;
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
