'use client';

import type * as React from 'react';
import { mergeCallbacks, slot } from '@fluentui/react-utilities';
import { useTeachingPopoverFooter as useTeachingPopoverFooterBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { Button } from '../../Button/Button';
import { usePopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type { TeachingPopoverFooterProps, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';

export const useTeachingPopoverFooter = (
  props: TeachingPopoverFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverFooterState => {
  const baseState = useTeachingPopoverFooterBase(props, ref);
  const { appearance } = usePopoverAppearanceContext();
  const isBrand = appearance === 'brand';
  const secondary = slot.optional(props.secondary, {
    defaultProps: { appearance: isBrand ? 'primary' : undefined },
    renderByDefault: props.secondary !== undefined,
    elementType: Button,
  });
  if (secondary) {
    secondary.onClick = mergeCallbacks(baseState.handleButtonClick, secondary.onClick);
  }
  const primary = slot.always(props.primary, {
    defaultProps: { appearance: isBrand ? undefined : 'primary' },
    elementType: Button,
  });
  if (!secondary) {
    primary.onClick = mergeCallbacks(baseState.handleButtonClick, primary.onClick);
  }

  return {
    ...baseState,
    appearance,
    components: { root: 'div', primary: Button, secondary: Button },
    primary,
    secondary,
    root: {
      ...baseState.root,
      'data-appearance': appearance,
      'data-footer-layout': baseState.footerLayout ?? 'horizontal',
    },
  } as TeachingPopoverFooterState;
};
