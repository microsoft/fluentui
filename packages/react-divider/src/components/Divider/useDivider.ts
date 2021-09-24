import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { DividerProps, DividerSlots, DividerState } from './Divider.types';

/**
 * Const listing which props are shorthand props.
 */
export const dividerShorthandProps: Array<keyof DividerSlots> = ['root', 'wrapper'];

/**
 * Returns the props and state required to render the component
 * @param props - Divider properties
 * @param ref - reference to root HTMLElement of Divider
 */
export const useDivider = (props: DividerProps, ref: React.Ref<HTMLElement>): DividerState => {
  const { alignContent = 'center', inset = false, vertical = false, appearance, wrapper } = props;
  const dividerId = useId('divider-');

  return {
    alignContent,
    components: {
      root: 'div',
      wrapper: 'div',
    },
    inset,
    root: getNativeElementProps('div', {
      ref,
      role: 'separator',
      'aria-labelledby': props.children ? dividerId : undefined,
      ...props,
    }),
    vertical,
    appearance,
    wrapper: resolveShorthand(wrapper, {
      required: true,
      defaultProps: {
        id: dividerId,
        children: props.children,
      },
    }),
  };
};
