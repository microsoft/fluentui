import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuGroupDividerProps, MenuGroupDividerState } from './MenuGroupDivider.types';

const mergeProps = makeMergeProps<MenuGroupDividerProps>();

/** Returns the props and state required to render the component */
export const useMenuGroupDivider = (
  props: MenuGroupDividerProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuGroupDividerProps,
): MenuGroupDividerState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const mergedProps = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      role: 'presentation ',
      'aria-hidden': true,
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return mergedProps;
};
