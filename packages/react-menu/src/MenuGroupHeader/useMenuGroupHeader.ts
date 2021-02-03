import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';
import { useMenuGroupContext } from '../menuGroupContext';

const mergeProps = makeMergeProps<MenuGroupHeaderProps>();

/** Returns the props and state required to render the component */
export const useMenuGroupHeader = (
  props: MenuGroupHeaderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuGroupHeaderProps,
): MenuGroupHeaderState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef();
  const { headerId } = useMenuGroupContext();
  const mergedProps = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      id: headerId,
      role: 'presentation ',
      'aria-hidden': true,
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return mergedProps;
};
