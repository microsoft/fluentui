import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Link, LinkProps } from '@fluentui/react-link';

export type BreadcrumbLinkSlots = {
  /**
   * Root element of the BreadcrumbLink.
   */
  root: Slot<typeof Link>;

  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
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
  Partial<Omit<BreadcrumbLinkProps, 'size'>> &
  Required<Pick<BreadcrumbLinkProps, 'size'>> & {
    /**
     * A BreadcrumbLink can contain only an icon.
     *
     * @default false
     */
    iconOnly: boolean;
  };
