export { Breadcrumb } from './Breadcrumb';
export type {
  BreadcrumbBaseProps,
  BreadcrumbBaseState,
  BreadcrumbContextValues,
  BreadcrumbProps,
  BreadcrumbSlots,
  BreadcrumbState,
} from './Breadcrumb.types';
export { BreadcrumbProvider, breadcrumbDefaultValue, useBreadcrumbContext_unstable } from './BreadcrumbContext';
export { renderBreadcrumb_unstable } from './renderBreadcrumb';
export {
  useBreadcrumb_unstable,
  useBreadcrumbBase_unstable,
  useBreadcrumbA11yBehavior_unstable,
} from './useBreadcrumb';
export { useBreadcrumbContextValues_unstable } from './useBreadcrumbContextValue';
// `breadcrumbClassNames` is `@deprecated for styling` (DECISIONS.md D16.5), but it is a
// RETAINED public export — the deprecation is addressed to consumers, and this barrel is how
// they receive it. Re-exporting it is the intended behaviour, not a deprecated usage.
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { breadcrumbClassNames, useBreadcrumbStyles_unstable } from './useBreadcrumbStyles.styles';
