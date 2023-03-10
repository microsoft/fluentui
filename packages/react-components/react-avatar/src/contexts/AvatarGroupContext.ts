import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import type { AvatarGroupContextValue } from '../AvatarGroup';

/**
 * AvatarGroupContext is provided by AvatarGroup and AvatarGroupPopover. It's consumed by AvatarGroupItem to determine
 * default values of some props.
 */
export const AvatarGroupContext: Context<AvatarGroupContextValue> = createContext<AvatarGroupContextValue | undefined>(
  undefined,
) as Context<AvatarGroupContextValue>;

const avatarGroupContextDefaultValue: AvatarGroupContextValue = {};

export const AvatarGroupProvider = AvatarGroupContext.Provider;

export const useAvatarGroupContext_unstable = <T>(selector: ContextSelector<AvatarGroupContextValue, T>): T =>
  useContextSelector(AvatarGroupContext, (ctx = avatarGroupContextDefaultValue) => selector(ctx));
