import * as React from 'react';
import { AvatarSize, AvatarShape } from '../components/Avatar/Avatar.types';

const avatarContext = React.createContext<AvatarContextValue | undefined>(undefined);

/**
 * @internal
 */
export interface AvatarContextValue {
  size?: AvatarSize;
  shape?: AvatarShape;
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
