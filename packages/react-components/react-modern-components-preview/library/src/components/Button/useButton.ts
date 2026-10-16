'use client';

import type * as React from 'react';
import { useButton as useButtonBase, useButtonContext } from '@fluentui/react-headless-components-preview/button';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Create the state required to render Button.
 *
 * The returned state can be modified with hooks such as useButtonStyles_unstable,
 * before being passed to renderButton_unstable.
 *
 * @param props - props from this instance of Button
 * @param ref - reference to root HTMLDivElement of Button
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>): ButtonState => {
  const context = useButtonContext();
  const { appearance = 'secondary', size = context.size ?? 'medium', shape = 'rounded', ...rest } = props;
  const state = useButtonBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
      'data-shape': shape,
    },
    appearance,
    size,
    shape,
  };
};
