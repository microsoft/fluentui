import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuItemSelectable } from '../../selectable/index';
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
  const { setFocusByFirstCharacter } = useMenuListContext();
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

  // TODO render MenuItem as a slot to reduce duplication
  const { onKeyDown: onKeyDownBase } = state;
  state.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (onKeyDownBase) {
      onKeyDownBase(e);
    }

    if (e.key?.length > 1) {
      return;
    }

    setFocusByFirstCharacter?.(e, state.ref.current);
  };

  useMenuItemSelectable(state, () => {
    const newCheckedItems = [...state.checkedItems];
    const index = state.checkedItems.indexOf(state.value);
    if (index !== -1) {
      newCheckedItems.splice(index, 1);
    } else {
      newCheckedItems.push(state.value);
    }

    return newCheckedItems;
  });

  return state;
};
