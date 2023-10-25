import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';
import type { BreadcrumbButtonProps, BreadcrumbButtonState } from './BreadcrumbButton.types';

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
  const { current = false, icon, ...rest } = props;

  return {
    ...useButton_unstable(
      {
        appearance: 'subtle',
        ...rest,
        iconPosition: 'before',
        icon,
        'aria-current': current ? props['aria-current'] ?? 'page' : undefined,
        'aria-disabled': current ? props['aria-disabled'] ?? true : undefined,
      },
      ref,
    ),
    current,
    size,
  };
};
