import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuGroupProps, MenuGroupState } from './MenuGroup.types';
import { useMergedRefs, useId } from '@fluentui/react-hooks';

/**
 * Consts listing which props are shorthand props.
 */
export const menuGroupShorthandProps = ['loader', 'content'];

const mergeProps = makeMergeProps<MenuGroupState>({ deepMerge: menuGroupShorthandProps });

/**
 * Given user props, returns state and render function for a MenuGroup.
 */
export const useMenuGroup = (
  props: MenuGroupProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuGroupProps,
): MenuGroupState => {
  const id = useId('menu-group');
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      'aria-labelledby': id,
      role: 'group',
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  state.headerId = id;

  return state;
};
