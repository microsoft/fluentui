import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Data shared between breadcrumb components
 */
export type BreadcrumbContextValue = Required<
  Pick<BreadcrumbProps, 'appearance' | 'dividerType' | 'iconPosition' | 'size'>
>;

export type BreadcrumbContextValues = {
  breadcrumb: BreadcrumbContextValue;
};

export type BreadcrumbSlots = {
  /**
   * Root element of the component.
   */
  root: Slot<'nav'>;
  /**
   * Ordered list which contains items.
   */
  list?: Slot<'ol'>;
};

/**
 * Breadcrumb Props
 */
export type BreadcrumbProps = ComponentProps<BreadcrumbSlots> & {
  /**
   * Breadcrumb appearance.
   *
   * @default 'transparent'
   */
  appearance?: 'transparent' | 'subtle';

  /**
   * Makes Breadcrumb not focusable.
   *
   * @default false
   */
  disableFocus?: boolean;

  /**
   * Controls type of the divider.
   *
   * @default 'chevron'
   */
  dividerType?: 'chevron' | 'slash';

  /**
   * Icon position for BreadcrumbButton or BreadcrumbLink.
   *
   * @default 'before'
   */
  iconPosition?: 'before' | 'after';

  /**
   * Controls size of Breadcrumb items and dividers.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots> &
  Required<Pick<BreadcrumbProps, 'appearance' | 'iconPosition' | 'size' | 'dividerType'>>;
