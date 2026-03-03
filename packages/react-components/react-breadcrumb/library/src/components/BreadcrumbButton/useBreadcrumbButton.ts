'use client';

import * as React from 'react';
import type { ARIAButtonProps } from '@fluentui/react-aria';
import { useButton_unstable } from '@fluentui/react-button';
import type { ButtonProps } from '@fluentui/react-button';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';
import type {
  BreadcrumbButtonBaseProps,
  BreadcrumbButtonBaseState,
  BreadcrumbButtonProps,
  BreadcrumbButtonState,
} from './BreadcrumbButton.types';

/**
 * Create the state required to render BreadcrumbButton.
 *
 * The returned state can be modified with hooks such as useBreadcrumbButtonStyles_unstable,
 * before being passed to renderBreadcrumbButton_unstable.
 *
 * @param props - props from this instance of BreadcrumbButton
 * @param ref - reference to root HTMLElement of BreadcrumbButton
 */
export const useBreadcrumbButton_unstable = (
  props: BreadcrumbButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): BreadcrumbButtonState => {
  const { size } = useBreadcrumbContext_unstable();
  const state = useBreadcrumbButtonBase_unstable(props, ref);

  return {
    ...state,
    size,
  };
};

/**
 * Base hook for BreadcrumbButton component, which manages state related to button behavior,
 * ARIA attributes (aria-current, aria-disabled), and slot structure without design props.
 *
 * @param props - props from this instance of BreadcrumbButton
 * @param ref - reference to root HTMLElement of BreadcrumbButton
 */
export const useBreadcrumbButtonBase_unstable = (
  props: BreadcrumbButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): BreadcrumbButtonBaseState => {
  const { current = false, as, ...rest } = props;

  const controlType = as ?? (props as ARIAButtonProps<'a'>).href ? 'a' : 'button';

  const { size: _size, ...buttonState } = useButton_unstable(
    {
      role: undefined,
      type: undefined,
      as: controlType,
      iconPosition: 'before',
      'aria-current': current ? props['aria-current'] ?? 'page' : undefined,
      'aria-disabled': current ? props['aria-disabled'] ?? true : undefined,
      ...rest,
    } as ButtonProps,
    ref,
  );

  return {
    ...buttonState,
    current,
  };
};
