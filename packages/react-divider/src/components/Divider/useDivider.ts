import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import { DividerProps, DividerState } from './Divider.types';

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
    inset,
    vertical,
    appearance,
    components: {
      root: 'div',
      wrapper: 'div',
    },
    root: getNativeElementProps('div', {
      ...props,
      ref,
      role: 'separator',
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
