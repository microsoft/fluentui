export {
  Breadcrumb,
  renderBreadcrumb_unstable,
  useBreadcrumb_unstable,
  useBreadcrumbBase_unstable,
  useBreadcrumbA11yBehavior_unstable,
  useBreadcrumbStyles_unstable,
  useBreadcrumbContextValues_unstable,
  // The four `*ClassNames` constants below are `@deprecated for styling` (DECISIONS.md
  // D16.5) but are RETAINED public exports: the deprecation is addressed to consumers, and
  // this is the package entry point they import from. Re-exporting them is the intended
  // behaviour, not a deprecated usage.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  breadcrumbClassNames,
} from './Breadcrumb';
export type {
  BreadcrumbSlots,
  BreadcrumbProps,
  BreadcrumbState,
  BreadcrumbBaseProps,
  BreadcrumbBaseState,
} from './Breadcrumb';
export {
  BreadcrumbDivider,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public export, see above
  breadcrumbDividerClassNames,
  renderBreadcrumbDivider_unstable,
  useBreadcrumbDividerStyles_unstable,
  useBreadcrumbDivider_unstable,
  useBreadcrumbDividerBase_unstable,
} from './BreadcrumbDivider';
export type {
  BreadcrumbDividerProps,
  BreadcrumbDividerSlots,
  BreadcrumbDividerState,
  BreadcrumbDividerBaseProps,
  BreadcrumbDividerBaseState,
} from './BreadcrumbDivider';
export {
  BreadcrumbItem,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public export, see above
  breadcrumbItemClassNames,
  renderBreadcrumbItem_unstable,
  useBreadcrumbItemStyles_unstable,
  useBreadcrumbItem_unstable,
  useBreadcrumbItemBase_unstable,
} from './BreadcrumbItem';
export type {
  BreadcrumbItemProps,
  BreadcrumbItemSlots,
  BreadcrumbItemState,
  BreadcrumbItemBaseProps,
  BreadcrumbItemBaseState,
} from './BreadcrumbItem';
export {
  partitionBreadcrumbItems,
  truncateBreadcrumbLongName,
  truncateBreadcrumLongTooltip,
  isTruncatableBreadcrumbContent,
} from './utils/index';
export type { PartitionBreadcrumbItemsOptions, PartitionBreadcrumbItems } from './utils/index';
export {
  BreadcrumbButton,
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- retained public export, see above
  breadcrumbButtonClassNames,
  renderBreadcrumbButton_unstable,
  useBreadcrumbButtonStyles_unstable,
  useBreadcrumbButton_unstable,
  useBreadcrumbButtonBase_unstable,
} from './BreadcrumbButton';
export type {
  BreadcrumbButtonProps,
  BreadcrumbButtonSlots,
  BreadcrumbButtonState,
  BreadcrumbButtonBaseProps,
  BreadcrumbButtonBaseState,
} from './BreadcrumbButton';
export { BreadcrumbProvider, useBreadcrumbContext_unstable } from './Breadcrumb';
export type { BreadcrumbContextValues } from './Breadcrumb';
