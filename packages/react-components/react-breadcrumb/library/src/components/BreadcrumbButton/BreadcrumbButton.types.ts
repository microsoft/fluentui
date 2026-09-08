import type { ComponentProps, ComponentState, DistributiveOmit } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';
import type { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

export type BreadcrumbButtonSlots = ButtonSlots;

/**
 * BreadcrumbButton Props
 */
export type BreadcrumbButtonProps = ComponentProps<BreadcrumbButtonSlots> &
  Pick<BreadcrumbProps, 'size'> &
  Pick<ButtonProps, 'disabled' | 'disabledFocusable'> & {
    /**
     * Defines current sate of BreadcrumbButton.
     *
     * @default false
     */
    current?: boolean;
  };

/**
 * State used in rendering BreadcrumbButton
 */
export type BreadcrumbButtonState = ComponentState<BreadcrumbButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components'> &
  Required<Pick<BreadcrumbButtonProps, 'current' | 'size'>>;

export type BreadcrumbButtonBaseProps = DistributiveOmit<BreadcrumbButtonProps, 'size'>;

export type BreadcrumbButtonBaseState = Omit<BreadcrumbButtonState, 'appearance' | 'size' | 'shape'>;
