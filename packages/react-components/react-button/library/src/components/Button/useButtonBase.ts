'use client';

import * as React from 'react';
import { type ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { DistributiveOmit, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { ButtonDesignProps, ButtonProps, ButtonState } from './Button.types';

export type ButtonBaseProps = DistributiveOmit<ButtonProps, keyof ButtonDesignProps>;

export type ButtonBaseState = DistributiveOmit<ButtonState, keyof ButtonDesignProps>;

/**
 * Given user props, defines default props for the Button base state and returns it, without design props and their defaults.
 *
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 * @returns Button base state
 */
export const useButtonBase_unstable = (
  props: ButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonBaseState => {
  const { as = 'button', disabled = false, disabledFocusable = false, icon, iconPosition = 'before' } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  return {
    disabled,
    disabledFocusable,
    iconPosition,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    root: slot.always<ARIAButtonSlotProps<'a'>>(
      getIntrinsicElementProps(as, useARIAButtonProps(props.as, props as ARIAButtonSlotProps<'a'>)),
      {
        elementType: as,
        defaultProps: {
          ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
          type: as === 'button' ? 'button' : undefined,
        },
      },
    ),
    icon: iconShorthand,
    components: { root: as, icon: 'span' },
  };
};
