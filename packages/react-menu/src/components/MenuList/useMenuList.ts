import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-focus-management';
import { MenuListProps, MenuListState } from './MenuList.types';

const mergeProps = makeMergeProps<MenuListState>();

/**
 * Returns the props and state required to render the component
 */
export const useMenuList = (
  props: MenuListProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuListProps,
): MenuListState => {
  const focusAttributes = useArrowNavigationGroup({ circular: true });
  const { findAll } = useFocusFinders();

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'menu',
      ...focusAttributes,
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { onKeyDown: onKeyDownBase } = state;

    if (onKeyDownBase) {
      onKeyDownBase(e);
    }

    if (e.key.length > 1) {
      return;
    }

    const elements = findAll(state.ref.current, (el: HTMLElement) => {
      const isMenuItem = el.hasAttribute('role') && el.getAttribute('role') === 'menuitem';
      const startsWith = e.key && e.key.length === 1 && e.key.match(/\S/);

      return isMenuItem && !!startsWith;
    });

    elements[0].focus();
  };

  return state;
};
