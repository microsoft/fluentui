import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuTriggerContextProvider } from '../index';

import { Button } from '@fluentui/react-button';
import { useMenuContext } from '../contexts/menuContext';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent } from '@fluentui/react-shared-contexts';
import { makeStyles } from '@fluentui/react-make-styles';
import { ArrowLeft, ArrowRight, ArrowDown, Escape } from '@fluentui/keyboard-keys';
import { shouldPreventDefaultOnKeyDown, useEventCallback } from '@fluentui/react-utilities';
import { MenuTriggerChildProps } from '../components/MenuTrigger/MenuTrigger.types';

const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    '& > :nth-child(1)': {
      width: '100%',
    },
    '& > :nth-child(2)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingLeft: 0,
      marginLeft: 'auto',
      ':before': {
        content: '""',
        width: theme.strokeWidthThin,
        height: '24px',
        backgroundColor: theme.colorNeutralStroke1,
      },
    },
  }),
});

/**
 * getting a trigger
 * 1. Special trigger that also renders DOM
 * 2. Special trigger that doesn't render DOM + style wrapper -> consistent
 * 3. Good ol' render functions
 *
 * styling + differences with menuitems
 * 1. CSS only modifications from parent wrapper -> rely on trigger cloning for state
 * 2. Recompose standard menuitem -> can tweak state + styles
 *
 * Ask Adam to test out a11y behaviours
 */

export const SplitMenuItem = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem>Open Folder</MenuItem>
        <Menu>
          <MenuTrigger>
            <MenuItem>Submenu</MenuItem>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
              <MenuItem>Item</MenuItem>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <Menu>
          {/**
           * Contract is clear -> trigger clones elements
           * Order of wrapping is not clear
           * Can type MenuSplitTrigger to require more than one child
           */}
          <MenuSplitGroup>
            <MenuSplitTrigger>
              <MenuItem>Main</MenuItem>
              <MenuItem />
            </MenuSplitTrigger>
          </MenuSplitGroup>
          <MenuPopover>
            <MenuList>
              <MenuItem>Item</MenuItem>
              <MenuItem>Item</MenuItem>
              <MenuItem>Item</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </MenuList>
    </MenuPopover>
  </Menu>
);

const MenuSplitGroup: React.FC<{}> = props => {
  const styles = useStyles();

  return <div className={styles.root}>{props.children}</div>;
};

const MenuSplitTrigger: React.FC<{}> = props => {
  const children = React.Children.toArray(props.children) as React.ReactElement[];

  const action = useTriggerActionElement(children[0]);
  const trigger = useTriggerElement(children[1]);

  return (
    <>
      {action}
      <MenuTriggerContextProvider value={true}>{trigger}</MenuTriggerContextProvider>
    </>
  );
};

const useTriggerActionElement = (child: React.ReactElement) => {
  const menuPopoverRef = useMenuContext(context => context.menuPopoverRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const isSubmenu = true;
  const { findFirstFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(menuPopoverRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, menuPopoverRef]);

  const { dir } = useFluent();
  const OpenArrowKey = dir === 'ltr' ? ArrowRight : ArrowLeft;

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    const key = e.key;

    if (isSubmenu && key === OpenArrowKey) {
      setOpen(e, { open: true, keyboard: true });
    }

    // if menu is already open, can't rely on effects to focus
    if (open && key === OpenArrowKey && isSubmenu) {
      focusFirst();
    }

    child?.props?.onKeyDown?.(e);
  });

  const disabled = child?.props?.disabled;
  const noop = () => null;
  const triggerProps: Partial<MenuTriggerChildProps> = {
    ...(!disabled
      ? {
          onKeyDown,
        }
      : // Spread disabled event handlers to implement contract and avoid specific disabled logic in handlers
        {
          onKeyDown: noop,
        }),
  };

  return React.cloneElement(child, triggerProps);
};

const useTriggerElement = (child: React.ReactElement) => {
  const triggerRef = useMenuContext(context => context.triggerRef);
  const menuPopoverRef = useMenuContext(context => context.menuPopoverRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const triggerId = useMenuContext(context => context.triggerId);
  const openOnHover = useMenuContext(context => context.openOnHover);
  const openOnContext = useMenuContext(context => context.openOnContext);
  const isSubmenu = true;
  const { findFirstFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(menuPopoverRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, menuPopoverRef]);

  const openedWithKeyboardRef = React.useRef(false);
  const hasMouseMoved = React.useRef(false);

  const { dir } = useFluent();
  const OpenArrowKey = dir === 'ltr' ? ArrowRight : ArrowLeft;

  const onContextMenu = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnContext) {
      e.preventDefault();
      setOpen(e, { open: true, keyboard: false });
    }

    child?.props?.onContextMenu?.(e);
  });

  const onClick = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!openOnContext) {
      setOpen(e, { open: !open, keyboard: openedWithKeyboardRef.current });
      openedWithKeyboardRef.current = false;
    }

    child?.props?.onClick?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();
      openedWithKeyboardRef.current = true;
      (e.target as HTMLElement)?.click();
    }

    const key = e.key;

    if (!openOnContext && ((isSubmenu && key === OpenArrowKey) || (!isSubmenu && key === ArrowDown))) {
      setOpen(e, { open: true, keyboard: true });
    }

    if (key === Escape && !isSubmenu) {
      setOpen(e, { open: false, keyboard: true });
    }

    // if menu is already open, can't rely on effects to focus
    if (open && key === OpenArrowKey && isSubmenu) {
      focusFirst();
    }

    child?.props?.onKeyDown?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
    }

    child?.props?.onMouseEnter?.(e);
  });

  // Opening a menu when a mouse hasn't moved and just entering the trigger is a bad a11y experience
  // First time open the mouse using mousemove and then continue with mouseenter
  // Only use once to determine that the user is using the mouse since it is an expensive event to handle
  const onMouseMove = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
      hasMouseMoved.current = true;
    }
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, { open: false, keyboard: false });
    }

    child?.props?.onMouseLeave?.(e);
  });

  const disabled = child?.props?.disabled;
  const noop = () => null;
  const triggerProps: MenuTriggerChildProps = {
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    id: child?.props?.id || triggerId,

    ...(!disabled
      ? {
          onClick,
          onMouseEnter,
          onMouseLeave,
          onContextMenu,
          onKeyDown,
          onMouseMove,
        }
      : // Spread disabled event handlers to implement contract and avoid specific disabled logic in handlers
        {
          onClick: noop,
          onMouseEnter: noop,
          onMouseLeave: noop,
          onContextMenu: noop,
          onKeyDown: noop,
          onMouseMove: noop,
        }),
  };

  if (!open && !isSubmenu) {
    triggerProps['aria-expanded'] = undefined;
  }

  return React.cloneElement(child, { ...triggerProps, ref: triggerRef });
};
