'use client';

import type * as React from 'react';
import {
  useBreadcrumbButton as useBreadcrumbButtonBase,
  useBreadcrumbContext,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbButtonProps, BreadcrumbButtonState } from './BreadcrumbButton.types';

const toDataAttributeValue = (value: boolean): '' | undefined => (value ? '' : undefined);

export const useBreadcrumbButton = (
  props: BreadcrumbButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): BreadcrumbButtonState => {
  const { size: contextSize = 'medium' } = useBreadcrumbContext();
  const { size = contextSize, ...rest } = props;
  const state = useBreadcrumbButtonBase(rest, ref);

  return {
    ...state,
    appearance: 'subtle',
    root: {
      ...state.root,
      'data-appearance': 'subtle',
      'data-disabled': toDataAttributeValue(state.disabled),
      'data-disabled-focusable': toDataAttributeValue(state.disabledFocusable),
      'data-icon-only': toDataAttributeValue(state.iconOnly),
      'data-icon-position': state.icon ? state.iconPosition : undefined,
      'data-shape': 'rounded',
      'data-size': size,
    },
    shape: 'rounded',
    size,
  };
};
