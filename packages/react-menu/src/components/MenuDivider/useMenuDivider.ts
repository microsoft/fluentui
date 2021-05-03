import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuDividerProps, MenuDividerState } from './MenuDivider.types';

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuDividerState>({});

/**
 * Given user props, returns state and render function for a MenuDivider.
 */
export const useMenuDivider = (
  props: MenuDividerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuDividerProps,
): MenuDividerState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      role: 'presentation',
      'aria-hidden': true,
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return state;
};
