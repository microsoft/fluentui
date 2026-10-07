'use client';

import type * as React from 'react';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { slot } from '@fluentui/react-utilities';

import type { ButtonBaseState, ButtonProps } from './Button.types';

/**
 * Base hook for Button, which manages state related to slots structure and ARIA attributes.
 * It emits no `data-*` attributes; `useButton` adds those on top.
 *
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButtonBase = (
  props: ButtonProps,
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonBaseState => {
  const { icon, iconPosition = 'before', ...buttonProps } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  return {
    disabled: props.disabled ?? false,
    disabledFocusable: props.disabledFocusable ?? false,
    iconPosition,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(useARIAButtonProps(buttonProps.as, buttonProps), {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: props.as !== 'a' ? 'button' : undefined,
      },
    }),
    icon: iconShorthand,
  };
};
