import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';
import { BreadcrumbProps } from '../Breadcrumb/Breadcrumb.types';

export type BreadcrumbButtonSlots = Omit<ButtonSlots, 'icon'>;

/**
 * BreadcrumbButton Props
 */
export type BreadcrumbButtonProps = ComponentProps<BreadcrumbButtonSlots> &
  Pick<BreadcrumbProps, 'appearance' | 'size'> &
  Pick<ButtonProps, 'disabled'> & {
    /**
     * Defines selected sate of BreadcrumbButton.
     *
     * @default false
     */
    selected?: boolean;
  };

/**
 * State used in rendering BreadcrumbButton
 */
export type BreadcrumbButtonState = ComponentState<BreadcrumbButtonSlots> &
  Omit<ButtonState, keyof ButtonSlots | 'components' | 'icon'> &
  Required<Pick<BreadcrumbButtonProps, 'selected'>>;
