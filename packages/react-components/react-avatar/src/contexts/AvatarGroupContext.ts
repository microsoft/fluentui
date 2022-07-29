import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { AvatarGroupContextValue } from '../AvatarGroup';

/**
 * AvatarGroupContext is provided by AvatarGroup, and is consumed by AvatarGroupItem to determine
 * default values of some props.
 */
// eslint-disable-next-line @fluentui/no-context-default-value
export const AvatarGroupContext: Context<AvatarGroupContextValue> = createContext({});

export const AvatarGroupProvider = AvatarGroupContext.Provider;

export const useAvatarGroupContext_unstable = <T>(selector: ContextSelector<AvatarGroupContextValue, T>): T =>
  useContextSelector(AvatarGroupContext, selector);
