export type {
  BreadcrumbButtonProps,
  BreadcrumbButtonSlots,
  BreadcrumbButtonState,
  BreadcrumbButtonBaseProps,
  BreadcrumbButtonBaseState,
} from './components/BreadcrumbButton/index';
export {
  BreadcrumbButton,
  // `@deprecated for styling` (DECISIONS.md D16.5) but a RETAINED public export — the
  // deprecation is addressed to consumers, and this barrel is how they receive it.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  breadcrumbButtonClassNames,
  renderBreadcrumbButton_unstable,
  useBreadcrumbButtonStyles_unstable,
  useBreadcrumbButton_unstable,
  useBreadcrumbButtonBase_unstable,
} from './components/BreadcrumbButton/index';
