import type {
  FluentProviderContextValues,
  FluentProviderSlots,
  FluentProviderProps,
  FluentProviderState,
} from '@fluentui/react-provider';

export type ProviderSlots = FluentProviderSlots;

/**
 * Provider Props
 */
export type ProviderProps = Omit<
  FluentProviderProps,
  'applyStylesToPortals' | 'theme' | 'customStyleHooks_unstable' | 'overrides_unstable'
>;

/**
 * State used in rendering Provider
 */
export type ProviderState = Omit<
  FluentProviderState,
  | 'applyStylesToPortals'
  | 'theme'
  | 'themeClassName'
  | 'customStyleHooks_unstable'
  | 'overrides_unstable'
  | 'serverStyleProps'
>;

export type ProviderContextValues = FluentProviderContextValues;
