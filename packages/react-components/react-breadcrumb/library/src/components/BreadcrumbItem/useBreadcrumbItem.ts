'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type {
  BreadcrumbItemBaseProps,
  BreadcrumbItemBaseState,
  BreadcrumbItemProps,
  BreadcrumbItemState,
} from './BreadcrumbItem.types';
import { useBreadcrumbContext_unstable } from '../Breadcrumb/BreadcrumbContext';

/**
 * Create the state required to render BreadcrumbItem.
 *
 * The returned state can be modified with hooks such as useBreadcrumbItemStyles_unstable,
 * before being passed to renderBreadcrumbItem_unstable.
 *
 * @param props - props from this instance of BreadcrumbItem
 * @param ref - reference to root HTMLElement of BreadcrumbItem
 */
export const useBreadcrumbItem_unstable = (
  props: BreadcrumbItemProps,
  ref: React.Ref<HTMLLIElement>,
): BreadcrumbItemState => {
  const { size } = useBreadcrumbContext_unstable();
  // `size` comes from the Breadcrumb context, the prop is not a DOM attribute.
  const { size: _size, ...baseProps } = props;
  const state = useBreadcrumbItemBase_unstable(baseProps, ref);

  return {
    ...state,
    size,
  };
};

/**
 * Base hook for BreadcrumbItem component, which manages state related to slots structure
 * without design props. Note: size is provided via BreadcrumbContext in the full hook.
 *
 * @param props - props from this instance of BreadcrumbItem
 * @param ref - reference to root HTMLElement of BreadcrumbItem
 */
export const useBreadcrumbItemBase_unstable = (
  props: BreadcrumbItemBaseProps,
  ref: React.Ref<HTMLLIElement>,
): BreadcrumbItemBaseState => {
  return {
    components: { root: 'li' },
    root: slot.always(
      {
        ref,
        ...props,
      },
      { elementType: 'li' },
    ),
  };
};
