export { createCSSRuleFromTheme } from './createCSSRuleFromTheme';
export { FluentProvider } from './FluentProvider';
export type {
  FluentProviderContextValues,
  FluentProviderCustomStyleHooks,
  FluentProviderProps,
  FluentProviderSlots,
  FluentProviderState,
} from './FluentProvider.types';
export { renderFluentProvider_unstable } from './renderFluentProvider';
export { useFluentProvider_unstable } from './useFluentProvider';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
export { fluentProviderClassNames, useFluentProviderStyles_unstable } from './useFluentProviderStyles.styles';
export { useFluentProviderContextValues_unstable } from './useFluentProviderContextValues';
export { useFluentProviderThemeStyleTag } from './useFluentProviderThemeStyleTag';
