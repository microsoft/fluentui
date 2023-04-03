import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Link } from '@fluentui/react-link';

export type BreadcrumbLinkSlots = {
  root: Slot<typeof Link>;
  icon?: Slot<'span'>;
};

/**
 * BreadcrumbLink Props
 */
export type BreadcrumbLinkProps = ComponentProps<BreadcrumbLinkSlots> & {
  iconPosition?: 'before' | 'after';
  overflow?: boolean;
};

/**
 * State used in rendering BreadcrumbLink
 */
export type BreadcrumbLinkState = ComponentState<BreadcrumbLinkSlots> &
  Required<Pick<BreadcrumbLinkProps, 'iconPosition' | 'disabled' | 'overflow'>> & {
    iconOnly: boolean;
  };
