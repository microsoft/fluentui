import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useId, useMergedRefs } from '@fluentui/react-utilities';
import { DividerProps, DividerState } from './Divider.types';

/**
 * Consts listing which props are shorthand props.
 */
export const dividerShorthandProps = ['wrapper', 'children'] as const;

const mergeProps = makeMergeProps<DividerState>({ deepMerge: dividerShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props - Divider properties
 * @param ref - reference to root HTMLElement of Divider
 * @param defaultProps - default values for the properties of Divider
 */
export const useDivider = (
  props: DividerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: DividerProps,
): DividerState => {
  const dividerId = useId('divider-');
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      /* The Id created to expose accessibility for readers */
      'aria-labelledby': props.children ? dividerId : undefined,
      wrapper: { as: 'div', children: props.children, id: dividerId },
    },
    defaultProps && resolveShorthandProps(defaultProps, dividerShorthandProps),
    resolveShorthandProps(props, dividerShorthandProps),
  );

  return state;
};
