'use client';

import * as React from 'react';
import type { DividerProps, DividerState } from './Divider.types';
import { slot, useId } from '@fluentui/react-utilities';

/**
 * Returns the props and state required to render the component
 * @param props - User-provided props to the Divider component.
 * @param ref - User-provided ref to be passed to the Divider component.
 */
export const useDivider_unstable = (props: DividerProps, ref?: React.Ref<HTMLElement>): DividerState => {
  const { alignContent = 'center', appearance = 'default', inset = false, vertical = false, wrapper, ...rest } = props;
  const dividerId = useId('divider-');

  return {
    alignContent,
    appearance,
    inset,
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
