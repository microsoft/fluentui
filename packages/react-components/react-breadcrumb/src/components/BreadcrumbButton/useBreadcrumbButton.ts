import * as React from 'react';
import type { BreadcrumbButtonProps, BreadcrumbButtonState } from './BreadcrumbButton.types';
import { useButton_unstable, ButtonProps } from '@fluentui/react-button';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';

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
  const { appearance, iconPosition, size } = useBreadcrumbContext_unstable();

  const { current = false, ...rest } = props;
  const newProps = {
    ...rest,
    appearance: (props.appearance || appearance) as ButtonProps['appearance'],
    iconPosition,
  };
  const buttonState = useButton_unstable(newProps, ref);
  return {
    ...buttonState,
    components: {
      root: 'button',
      icon: 'span',
    },
    current,
    size,
  };
};
