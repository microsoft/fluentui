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
   * Controls size of Breadcrumb items and dividers.
   *
   * @default 'medium'
   */
  dividerType?: 'chevron' | 'slash';

  iconPosition?: 'before' | 'after';
  size?: 'small' | 'medium' | 'large';
};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots> &
  Required<Pick<BreadcrumbProps, 'appearance' | 'iconPosition' | 'size' | 'dividerType'>>;
