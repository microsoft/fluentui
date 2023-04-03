import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

export type BreadcrumbItemSlots = {
  root: Slot<'li'>;
  icon?: Slot<'span'>;
};

/**
 * BreadcrumbItem Props
 */
export type BreadcrumbItemProps = ComponentProps<BreadcrumbItemSlots> &
  Pick<BreadcrumbProps, 'size'> & {
    iconPosition?: 'before' | 'after';
  };

/**
 * State used in rendering BreadcrumbItem
 */
export type BreadcrumbItemState = ComponentState<BreadcrumbItemSlots> &
  Required<Pick<BreadcrumbItemProps, 'size' | 'iconPosition'>> & {
    iconOnly: boolean;
  };
