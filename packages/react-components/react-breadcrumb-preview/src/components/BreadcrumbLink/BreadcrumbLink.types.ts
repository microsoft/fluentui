import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { LinkProps } from '@fluentui/react-link';

export type BreadcrumbLinkSlots = {
  /**
   * Root element of the BreadcrumbLink.
   */
  root: LinkProps;

  /**
   * Icon that renders before the `children`.
   */
  icon?: Slot<'span'>;
};

/**
 * BreadcrumbLink Props
 */
export type BreadcrumbLinkProps = ComponentProps<BreadcrumbLinkSlots> &
  Pick<LinkProps, 'appearance' | 'disabled'> & {
    /**
     * Defines current sate of BreadcrumbLink.
     *
     * @default false
     */
    current?: boolean;

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
  Partial<Omit<BreadcrumbLinkProps, 'size'>> &
  Required<Pick<BreadcrumbLinkProps, 'size'>>;
