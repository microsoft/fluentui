import * as React from 'react';
import { usePopper } from '@fluentui/react-positioning';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useControllableValue,
  useId,
  useOnClickOutside,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-provider';
import { getCode, keyboardKey } from '@fluentui/keyboard-key';
import { MenuProps, MenuState } from './Menu.types';
import { MenuTrigger } from '../MenuTrigger/index';
import { useMenuContext } from '../../contexts/menuContext';
import { isOutsideMenu } from '../../utils/index';

export const menuShorthandProps: (keyof MenuProps)[] = ['menuPopup'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuState>({ deepMerge: menuShorthandProps });

/**
 * Create the state required to render Menu.
 *
 * The returned state can be modified with hooks such as useMenuStyles,
 * before being passed to renderMenu.
 *
 * @param props - props from this instance of Menu
 * @param ref - reference to root HTMLElement of Menu
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Menu }
 */
export const useMenu = (props: MenuProps, ref: React.Ref<HTMLElement>, defaultProps?: MenuProps): MenuState => {
  const { document } = useFluent();
  const triggerId = useId();
  const isSubmenu = useMenuContext(context => context.hasMenuContext);

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      menuPopup: { as: 'div' },
      position: isSubmenu ? 'after' : 'below',
      align: isSubmenu ? 'top' : 'start',
      onHover: isSubmenu,
      triggerId,
    },
    defaultProps,
    resolveShorthandProps(props, menuShorthandProps),
  );

  const [checkedValues, setCheckedValues] = useControllableValue(state.checkedValues, state.defaultCheckedValues);
  state.checkedValues = checkedValues;
  const { onCheckedValueChange: onCheckedValueChangeOriginal } = state;
  state.onCheckedValueChange = useEventCallback((e, name, checkedItems) => {
    if (onCheckedValueChangeOriginal) {
      onCheckedValueChangeOriginal(e, name, checkedItems);
    }

    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  });

  // TODO Better way to narrow types ?
  const children = React.Children.toArray(state.children) as React.ReactElement[];

  // TODO throw warnings in development safely
  if (children.length !== 2) {
    // eslint-disable-next-line no-console
    console.warn('Menu can only take one MenuTrigger and one MenuList as children');
  }

  const { targetRef: triggerRef, containerRef: menuPopupRef } = usePopper({
    align: state.align,
    position: state.position,
  });
  state.menuPopupRef = menuPopupRef;
  state.triggerRef = triggerRef;
  children.forEach(child => {
    if (child.type === MenuTrigger) {
      state.menuTrigger = child;
    } else {
      state.menuList = child;
    }
  });

  const [open, setOpen] = useControllableValue(state.open, state.defaultOpen);
  // TODO fix useControllableValue typing
  state.open = open !== undefined ? open : state.open;
  state.setOpen = React.useCallback(
    (...args) => {
      setOpen(...args);
    },
    [setOpen],
  );

  useMenuPopup(state);
  useOnClickOutside({
    element: document,
    refs: [state.menuPopupRef, triggerRef],
    callback: () => setOpen(false),
  });

  return state;
};

const useMenuPopup = (state: MenuState) => {
  const { menuPopup, menuList, setOpen, triggerId, menuPopupRef, triggerRef, onHover, onContext } = state;

  menuPopup.children = (Component, originalProps) => {
    const newProps = { 'aria-labelledby': triggerId, ...originalProps };

    newProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      if (onHover && !onContext) {
        setOpen(true);
      }

      originalProps?.onMouseEnter?.(e);
    };

    newProps.onBlur = (e: React.FocusEvent<HTMLElement>) => {
      if (isOutsideMenu({ menuPopupRef, triggerRef, event: e })) {
        setOpen(false);
      }
      originalProps?.onBlur?.(e);
    };

    newProps.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      originalProps?.onKeyDown?.(e);
      const keyCode = getCode(e);

      if (keyCode !== keyboardKey.Escape) {
        return;
      }

      setOpen(false);
    };

    return React.createElement(
      Component as React.ElementType,
      {
        ...newProps,
        ref: menuPopupRef,
      },
      menuList,
    );
  };

  return state;
};
