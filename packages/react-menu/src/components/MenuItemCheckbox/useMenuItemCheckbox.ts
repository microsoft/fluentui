import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuItemSelectable } from '../../selectable/index';
import { useCharacterSearch } from '../../utils/useCharacterSearch';
import { useMenuListContext } from '../../menuListContext';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemCheckboxShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps<MenuItemCheckboxState>({ deepMerge: menuItemCheckboxShorthandProps });

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemCheckboxProps,
): MenuItemCheckboxState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      icon: { as: 'span' },
      checkmark: { as: 'span' },
      role: 'menuitemcheckbox',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemCheckboxShorthandProps),
  );

  useCharacterSearch(state);

  const toggleCheckbox = useMenuListContext((context) => context.toggleCheckbox);
  useMenuItemSelectable(state, toggleCheckbox);

  return state;
};
