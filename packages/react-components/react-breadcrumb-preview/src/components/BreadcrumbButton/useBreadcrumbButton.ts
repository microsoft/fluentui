import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import { useId } from '@fluentui/react-utilities';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';
import { BreadcrumbItem } from '../Breadcrumb/Breadcrumb.types';
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
  const { size, registerItem, removeItem } = useBreadcrumbContext_unstable();
  const { current = false, icon, ...rest } = props;
  const id = useId('breadcrumb-button-', props.id);

  React.useEffect(() => {
    const item: BreadcrumbItem = { key: id, type: 'button' };

    registerItem(item);

    return () => removeItem(item);
  }, [id, registerItem, removeItem]);

  return {
    ...useButton_unstable(
      {
        ...rest,
        appearance: 'transparent',
        iconPosition: 'before',
        icon,
        'aria-current': current ? props['aria-current'] ?? 'page' : undefined,
      },
      ref,
    ),
    current,
    size,
  };
};
