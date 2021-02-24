import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';
import { useMenuItemSelectable } from '../../selectable/index';
import { useMenuListContext } from '../../menuListContext';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemRadioShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps<MenuItemRadioState>({ deepMerge: menuItemRadioShorthandProps });

/**
 * Given user props, returns state and render function for a MenuItemRadio.
 */
export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemRadioProps,
): MenuItemRadioState => {
  const { setFocusByFirstCharacter } = useMenuListContext();
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef<HTMLElement>(null)),
      icon: { as: 'span' },
      checkmark: { as: 'span' },
      role: 'menuitemradio',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemRadioShorthandProps),
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

  useMenuItemSelectable(state, () => [state.value]);
  return state;
};
