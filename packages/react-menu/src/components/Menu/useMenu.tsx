import * as React from 'react';
import {
  makeMergeProps,
  resolveShorthandProps,
  useMergedRefs,
  useControllableValue,
  elementContains,
  useId,
  useEventCallback,
} from '@fluentui/react-utilities';
import { MenuProps, MenuState } from './Menu.types';
import { MenuTrigger } from '../MenuTrigger/index';
import { useFluent } from '@fluentui/react-provider';
import { getCode, keyboardKey } from '@fluentui/keyboard-key';

export const menuShorthandProps: (keyof MenuProps)[] = ['menuPopup'];

const mergeProps = makeMergeProps<MenuState>({ deepMerge: menuShorthandProps });

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

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      menuPopup: { as: 'div' },
      on: ['click'],
      triggerId,
    },
    defaultProps,
    resolveShorthandProps(props, menuShorthandProps),
  );

  // TODO Better way to narrow types ?
  const children = React.Children.toArray(state.children) as React.ReactElement[];

  // TODO throw warnings in development safely
  if (children.length !== 2) {
    // eslint-disable-next-line no-console
    console.warn('Menu can only take one MenuTrigger and one MenuList as children');
  }

  // TODO use Popper for the trigger ref
  const triggerRef = React.useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
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

  if (state.on.length === 0) {
    state.on = ['click'];
  }

  useMenuPopup(state);
  useOnClickOutside({ element: document, refs: [state.menuPopupRef, triggerRef], callback: () => setOpen(false) });
  useOnEscape({ element: document, callback: () => setOpen(false) });
  return state;
};

const useMenuPopup = (state: MenuState) => {
  // TODO use Popper for the popup ref
  const menuPopupRef = React.useRef<HTMLElement>(null) as React.MutableRefObject<HTMLElement>;
  state.menuPopupRef = menuPopupRef;
  state.menuPopup.children = (Component, originalProps) => {
    const newProps = { 'aria-labelledby': state.triggerId, ...originalProps };

    if (state.on.includes('hover')) {
      newProps.onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        state.setOpen(true);
        originalProps?.onMouseEnter?.(e);
      };
      newProps.onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        state.setOpen(false);
        originalProps?.onMouseLeave?.(e);
      };
    }

    newProps.onBlur = (e: React.FocusEvent<HTMLElement>) => {
      state.setOpen(false);
      originalProps?.onBlur?.(e);
    };

    newProps.onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      originalProps?.onKeyDown?.(e);
      const keyCode = getCode(e);

      if (keyCode !== keyboardKey.Escape) {
        return;
      }

      state.setOpen(false);
    };

    return (
      // Shorthand render funct types have issues
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Component {...newProps} ref={state.menuPopupRef}>
        {state.menuList}
      </Component>
    );
  };

  return state;
};

// TODO handle nested menus
const useOnClickOutside = (options: {
  element?: Node | Window | Document;
  refs: React.MutableRefObject<HTMLElement>[];
  callback: (ev: MouseEvent) => void;
}) => {
  const { refs, callback, element = document } = options;
  const listener = useEventCallback((ev: MouseEvent) => {
    const isOutside = !refs.some(ref => elementContains(ref.current, ev.target as HTMLElement));
    if (isOutside) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    element?.addEventListener('click', listener);
    element?.addEventListener('touchstart', listener);

    return () => {
      element?.removeEventListener('click', listener);
      element?.removeEventListener('touchstart', listener);
    };
  }, [listener, element]);
};

// TODO handle nested menus
const useOnEscape = (options: { element?: Node | Window | Document; callback: (ev: KeyboardEvent) => void }) => {
  const { callback, element = document } = options;

  React.useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      const keyCode = getCode(ev);
      if (keyCode === keyboardKey.Escape) {
        callback(ev);
      }
    };

    element?.addEventListener('keydown', listener);

    return () => element?.removeEventListener('keydown', listener);
  }, [callback, element]);
};
