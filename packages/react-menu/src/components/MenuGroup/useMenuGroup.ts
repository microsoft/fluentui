import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs, useId } from '@fluentui/react-utilities';
import { MenuGroupProps, MenuGroupState } from './MenuGroup.types';

/**
 * Consts listing which props are shorthand props.
 */
export const menuGroupShorthandProps = ['loader', 'content'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuGroupState>({ deepMerge: menuGroupShorthandProps });

/**
 * Given user props, returns state and render function for a MenuGroup.
 */
export function useMenuGroup(
  props: MenuGroupProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuGroupProps,
): MenuGroupState {
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
}
