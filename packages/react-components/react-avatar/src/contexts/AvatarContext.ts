import * as React from 'react';
import { AvatarSizes } from '../components/Avatar/Avatar.types';

const avatarContext = React.createContext<AvatarContextValue | undefined>(undefined);

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
