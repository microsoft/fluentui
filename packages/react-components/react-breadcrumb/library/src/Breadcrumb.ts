export type {
  BreadcrumbContextValues,
  BreadcrumbProps,
  BreadcrumbSlots,
  BreadcrumbState,
  BreadcrumbBaseProps,
  BreadcrumbBaseState,
} from './components/Breadcrumb/index';
export {
  Breadcrumb,
  BreadcrumbProvider,
  // `@deprecated for styling` (DECISIONS.md D16.5) but a RETAINED public export — the
  // deprecation is addressed to consumers, and this barrel is how they receive it.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  breadcrumbClassNames,
  breadcrumbDefaultValue,
  renderBreadcrumb_unstable,
  useBreadcrumbContext_unstable,
  useBreadcrumbStyles_unstable,
  useBreadcrumb_unstable,
  useBreadcrumbContextValues_unstable,
  useBreadcrumbBase_unstable,
  useBreadcrumbA11yBehavior_unstable,
} from './components/Breadcrumb/index';
