import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

type BreadcrumbSize = 'small' | 'medium' | 'large';
type BreadcrumbDividerType = 'chevron' | 'slash';
/**
 * Data shared between breadcrumb components
 */
export interface BreadcrumbContextValue {
  /**
   * Controls size of Breadcrumb items and dividers.
   *
   * @default 'medium'
   */
  size?: BreadcrumbSize;

  dividerType?: BreadcrumbDividerType;
}
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
export type BreadcrumbProps = ComponentProps<BreadcrumbSlots> & Partial<BreadcrumbContextValue> & {};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots> & BreadcrumbContextValue;
