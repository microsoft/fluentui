'use client';

import * as React from 'react';
import { useId, slot } from '@fluentui/react-utilities';
import type { DividerBaseProps, DividerBaseState, DividerProps, DividerState } from './Divider.types';

/**
 * Returns the props and state required to render the component
 * @param props - User-provided props to the Divider component.
 * @param ref - User-provided ref to be passed to the Divider component.
 */
export const useDivider_unstable = (props: DividerProps, ref: React.Ref<HTMLElement>): DividerState => {
  const { alignContent = 'center', appearance = 'default', inset = false, ...rest } = props;

  const state = useDividerBase_unstable(rest, ref);

  return {
    alignContent,
    appearance,
    inset,
    ...state,
  };
};

/**
 * Base hook that provides behavior and structure of the Divider component.
 * It doesn't include design-related features.
 *
 * @param props - User-provided props to the Divider component.
 * @param ref - User-provided ref to be passed to the Divider component.
 */
export const useDividerBase_unstable = (props: DividerBaseProps, ref?: React.Ref<HTMLElement>): DividerBaseState => {
  const { vertical = false, wrapper, ...rest } = props;
  const dividerId = useId('divider-');

  return {
    vertical,
    components: {
      root: 'div',
      wrapper: 'div',
    },
    root: slot.always(
      {
        role: 'separator',
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
        'aria-labelledby': props.children ? dividerId : undefined,
        ref: ref as React.Ref<HTMLDivElement>,
        ...rest,
      },
      { elementType: 'div' },
    ),
    wrapper: slot.always(wrapper, {
      defaultProps: {
        id: dividerId,
        children: props.children,
      },
      elementType: 'div',
    }),
  };
};
