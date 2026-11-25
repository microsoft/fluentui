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

  // Set data attribute for current state to simplify styling of the active breadcrumb item.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-current'] = toDataAttributeValue(state.current);

  return state;
};
