export type {
  FluentProviderContextValues,
  FluentProviderCustomStyleHooks,
  FluentProviderProps,
  FluentProviderSlots,
  FluentProviderState,
} from './components/FluentProvider/index';
export {
  FluentProvider,
  createCSSRuleFromTheme,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- re-exporting the retained identity constant IS the public-surface contract (DECISIONS.md D16.5): the export is kept so `root` keeps resolving, and `@deprecated` targets consumers who used it for styling, not this barrel.
  fluentProviderClassNames,
  renderFluentProvider_unstable,
  useFluentProviderContextValues_unstable,
  useFluentProviderStyles_unstable,
  useFluentProviderThemeStyleTag,
  useFluentProvider_unstable,
} from './components/FluentProvider/index';
