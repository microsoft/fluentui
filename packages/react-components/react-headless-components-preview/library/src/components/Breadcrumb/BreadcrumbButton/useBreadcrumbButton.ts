'use client';

import type * as React from 'react';
import { useBreadcrumbButtonBase_unstable } from '@fluentui/react-breadcrumb';

import type { BreadcrumbButtonProps, BreadcrumbButtonState } from './BreadcrumbButton.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a BreadcrumbButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderBreadcrumbButton`.
 */
export const useBreadcrumbButton = (
  props: BreadcrumbButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): BreadcrumbButtonState => {
  const state: BreadcrumbButtonState = useBreadcrumbButtonBase_unstable(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-current': toDataAttributeValue(state.current),
      'data-disabled': toDataAttributeValue(state.disabled),
      'data-disabled-focusable': toDataAttributeValue(state.disabledFocusable),
      'data-icon-only': toDataAttributeValue(state.iconOnly),
      'data-icon-position': state.icon ? state.iconPosition : undefined,
    },
  };
};
