export {
  createCSSRuleFromTheme,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  fluentProviderClassNames,
  FluentProvider,
  renderFluentProvider_unstable,
  useFluentProviderContextValues_unstable,
  useFluentProvider_unstable,
  useFluentProviderStyles_unstable,
  useFluentProviderThemeStyleTag,
} from './FluentProvider';
export type {
  FluentProviderContextValues,
  FluentProviderCustomStyleHooks,
  FluentProviderProps,
  FluentProviderState,
  FluentProviderSlots,
} from './FluentProvider';
