import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { DividerProps, DividerState } from './Divider.types';

/**
 * Returns the props and state required to render the component
 * @param props - User-provided props to the Divider component.
 * @param ref - User-provided ref to be passed to the Divider component.
 */
export const useDivider_unstable = (props: DividerProps, ref: React.Ref<HTMLElement>): DividerState => {
  const { alignContent = 'center', appearance = 'default', inset = false, vertical = false, wrapper } = props;
  const dividerId = useId('divider-');

  return {
    // Props passed at the top-level
    alignContent,
    appearance,
    inset,
    vertical,

    // Slots definition
    components: {
      root: 'div',
      wrapper: 'div',
    },

    root: getNativeElementProps('div', {
      ...props,
      ref,
      role: 'separator',
      'aria-orientation': vertical ? 'vertical' : 'horizontal',
      'aria-labelledby': props.children ? dividerId : undefined,
    }),
    wrapper: resolveShorthand(wrapper, {
      required: true,
      defaultProps: {
        id: dividerId,
        children: props.children,
      },
    }),
  };
};
