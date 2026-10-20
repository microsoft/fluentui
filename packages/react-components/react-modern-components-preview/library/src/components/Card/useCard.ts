'use client';

import type * as React from 'react';
import {
  useCard as useCardBase,
  useCardContext,
  useCardContextValue,
} from '@fluentui/react-headless-components-preview/card';
import type { CardProps, CardState } from './Card.types';

export { useCardContext, useCardContextValue };

/**
 * Create the state required to render Card.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLDivElement>): CardState => {
  const { appearance = 'filled', orientation = 'vertical', size = 'medium', ...rest } = props;
  const state = useCardBase(rest, ref);
  const interactive = !state.disabled && (state.interactive || state.selectable);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-has-floating-action': state.floatingAction ? '' : undefined,
      'data-interactive': interactive ? '' : undefined,
      'data-orientation': orientation,
      'data-select-focused': state.selectFocused ? '' : undefined,
      'data-selectable': state.selectable ? '' : undefined,
      'data-size': size,
    },
    appearance,
    orientation,
    size,
  };
};
