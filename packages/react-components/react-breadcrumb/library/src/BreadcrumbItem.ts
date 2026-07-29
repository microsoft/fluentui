export type {
  BreadcrumbItemProps,
  BreadcrumbItemSlots,
  BreadcrumbItemState,
  BreadcrumbItemBaseProps,
  BreadcrumbItemBaseState,
} from './components/BreadcrumbItem/index';
export {
  BreadcrumbItem,
  // `@deprecated for styling` (DECISIONS.md D16.5) but a RETAINED public export — the
  // deprecation is addressed to consumers, and this barrel is how they receive it.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  breadcrumbItemClassNames,
  renderBreadcrumbItem_unstable,
  useBreadcrumbItemStyles_unstable,
  useBreadcrumbItem_unstable,
  useBreadcrumbItemBase_unstable,
} from './components/BreadcrumbItem/index';
