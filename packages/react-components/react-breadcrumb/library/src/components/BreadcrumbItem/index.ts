export { BreadcrumbItem } from './BreadcrumbItem';
export type {
  BreadcrumbItemBaseProps,
  BreadcrumbItemBaseState,
  BreadcrumbItemProps,
  BreadcrumbItemSlots,
  BreadcrumbItemState,
} from './BreadcrumbItem.types';
export { renderBreadcrumbItem_unstable } from './renderBreadcrumbItem';
export { useBreadcrumbItem_unstable, useBreadcrumbItemBase_unstable } from './useBreadcrumbItem';
// `breadcrumbItemClassNames` is `@deprecated for styling` (DECISIONS.md D16.5), but it is a
// RETAINED public export — the deprecation is addressed to consumers, and this barrel is how
// they receive it. Re-exporting it is the intended behaviour, not a deprecated usage.
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { breadcrumbItemClassNames, useBreadcrumbItemStyles_unstable } from './useBreadcrumbItemStyles.styles';
