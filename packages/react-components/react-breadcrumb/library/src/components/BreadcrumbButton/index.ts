export { BreadcrumbButton } from './BreadcrumbButton';
export type {
  BreadcrumbButtonBaseProps,
  BreadcrumbButtonBaseState,
  BreadcrumbButtonProps,
  BreadcrumbButtonSlots,
  BreadcrumbButtonState,
} from './BreadcrumbButton.types';
export { renderBreadcrumbButton_unstable } from './renderBreadcrumbButton';
export { useBreadcrumbButton_unstable, useBreadcrumbButtonBase_unstable } from './useBreadcrumbButton';
// `breadcrumbButtonClassNames` is `@deprecated for styling` (DECISIONS.md D16.5), but it is a
// RETAINED public export — the deprecation is addressed to consumers, and this barrel is how
// they receive it. Re-exporting it is the intended behaviour, not a deprecated usage.
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { breadcrumbButtonClassNames, useBreadcrumbButtonStyles_unstable } from './useBreadcrumbButtonStyles.styles';
