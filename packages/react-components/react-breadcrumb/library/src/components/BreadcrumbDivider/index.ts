export { BreadcrumbDivider } from './BreadcrumbDivider';
export type {
  BreadcrumbDividerBaseProps,
  BreadcrumbDividerBaseState,
  BreadcrumbDividerProps,
  BreadcrumbDividerSlots,
  BreadcrumbDividerState,
} from './BreadcrumbDivider.types';
export { renderBreadcrumbDivider_unstable } from './renderBreadcrumbDivider';
export { useBreadcrumbDivider_unstable, useBreadcrumbDividerBase_unstable } from './useBreadcrumbDivider';
// `breadcrumbDividerClassNames` is `@deprecated for styling` (DECISIONS.md D16.5), but it is a
// RETAINED public export — the deprecation is addressed to consumers, and this barrel is how
// they receive it. Re-exporting it is the intended behaviour, not a deprecated usage.
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { breadcrumbDividerClassNames, useBreadcrumbDividerStyles_unstable } from './useBreadcrumbDividerStyles.styles';
