import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
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

    root: slot.always(
      getIntrinsicElementProps('div', {
        role: 'separator',
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
        'aria-labelledby': props.children ? dividerId : undefined,
        ...props,
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
      } as const),
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
