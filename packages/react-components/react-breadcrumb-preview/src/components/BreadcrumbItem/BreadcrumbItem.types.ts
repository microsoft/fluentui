import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { BreadcrumbProps } from '../Breadcrumb';

export type BreadcrumbItemSlots = {
  root: Slot<'li'>;

  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
};

/**
 * BreadcrumbItem Props
 */
export type BreadcrumbItemProps = ComponentProps<BreadcrumbItemSlots> &
  Pick<BreadcrumbProps, 'size'> & {
    /**
     * Defines current sate of the BreadcrumbItem.
     *
     * @default false
     */
    current?: boolean;
  };

/**
 * State used in rendering BreadcrumbItem
 */
export type BreadcrumbItemState = ComponentState<BreadcrumbItemSlots> &
  Required<Pick<BreadcrumbItemProps, 'size' | 'current'>>;
