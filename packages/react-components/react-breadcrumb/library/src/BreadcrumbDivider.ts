export type {
  BreadcrumbDividerProps,
  BreadcrumbDividerSlots,
  BreadcrumbDividerState,
  BreadcrumbDividerBaseProps,
  BreadcrumbDividerBaseState,
} from './components/BreadcrumbDivider/index';
export {
  BreadcrumbDivider,
  // `@deprecated for styling` (DECISIONS.md D16.5) but a RETAINED public export — the
  // deprecation is addressed to consumers, and this barrel is how they receive it.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  breadcrumbDividerClassNames,
  renderBreadcrumbDivider_unstable,
  useBreadcrumbDividerStyles_unstable,
  useBreadcrumbDivider_unstable,
  useBreadcrumbDividerBase_unstable,
} from './components/BreadcrumbDivider/index';
