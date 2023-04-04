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
  /**
   * Defines current sate of BreadcrumbLink.
   *
   * @default false
   */
  current?: boolean;

  /**
   * Icon position for BreadcrumbLink or BreadcrumbLink.
   *
   * @default 'before'
   */
  iconPosition?: 'before' | 'after';

  /**
   * Defines a sate when the Link is part of overflow menu.
   *
   * @default false
   */
  overflow?: boolean;

  /**
   * Controls size of Breadcrumb items and dividers.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
};

/**
 * State used in rendering BreadcrumbLink
 */
export type BreadcrumbLinkState = ComponentState<BreadcrumbLinkSlots> &
  Required<Pick<BreadcrumbLinkProps, 'iconPosition' | 'disabled' | 'overflow' | 'current' | 'size'>> & {
    iconOnly: boolean;
  };
