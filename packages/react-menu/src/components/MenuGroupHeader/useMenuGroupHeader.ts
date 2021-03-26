import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';
import { useMenuGroupContext } from '../../contexts/menuGroupContext';

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
