import type { ComponentProps, ComponentState, DistributiveOmit, DistributivePick } from '@fluentui/react-utilities';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';
import { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

export type BreadcrumbButtonSlots = ButtonSlots;

/**
 * BreadcrumbButton Props
 */
export type BreadcrumbButtonProps = ComponentProps<BreadcrumbButtonSlots> &
  Pick<BreadcrumbProps, 'size'> &
  DistributivePick<ButtonProps, 'disabled' | 'disabledFocusable'> & {
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
  DistributiveOmit<ButtonState, keyof ButtonSlots | 'components'> &
  Required<DistributivePick<BreadcrumbButtonProps, 'current' | 'size'>>;
