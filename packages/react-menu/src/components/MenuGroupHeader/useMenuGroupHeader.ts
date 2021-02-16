import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { useMergedRefs } from '@fluentui/react-hooks';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';
import { useMenuGroupContext } from '../../menuGroupContext';

const mergeProps = makeMergeProps<MenuGroupHeaderState>({});

/**
 * Given user props, returns state and render function for a MenuGroupHeader.
 */
export const useMenuGroupHeader = (
  props: MenuGroupHeaderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuGroupHeaderProps,
): MenuGroupHeaderState => {
  const { headerId: id } = useMenuGroupContext();

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      as: 'div',
      id,
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  return state;
};
