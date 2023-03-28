import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

/**
 * Data shared between breadcrumb components
 */
export type BreadcrumbContextValue = Required<Pick<BreadcrumbProps, 'size' | 'dividerType'>>;

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
   * Controls size of Breadcrumb items and dividers.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  dividerType?: 'chevron' | 'slash';
};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots> & Required<Pick<BreadcrumbProps, 'size' | 'dividerType'>>;
