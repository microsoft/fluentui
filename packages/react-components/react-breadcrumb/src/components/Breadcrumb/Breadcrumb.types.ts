import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

type Size = 'compact' | 'small' | 'medium' | 'large';
/**
 * Data shared between breadcrumb components
 */
export interface BreadcrumbContextValue {
  size?: Size;
}
export type BreadcrumbSlots = {
  root: Slot<'nav'>;
  list?: Slot<'ol'>;
};

/**
 * Breadcrumb Props
 */
export type BreadcrumbProps = ComponentProps<BreadcrumbSlots> & {
  size?: Size;
};

/**
 * State used in rendering Breadcrumb
 */
export type BreadcrumbState = ComponentState<BreadcrumbSlots> & BreadcrumbContextValue;
