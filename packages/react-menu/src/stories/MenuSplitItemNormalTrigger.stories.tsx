import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '../index';

import { Button } from '@fluentui/react-button';
import { makeStyles } from '@fluentui/react-make-styles';
import { useFocusFinders } from '@fluentui/react-tabster';

const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    '& > [role="menuitem"]:nth-child(1)': {
      width: '100%',
    },
    '& > [role="menuitem"]:nth-child(2)': {
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
           * Loses out on a11y behaviour on the primary action
           * Contract is clear - learn once
           */}
          <MenuSplitGroup>
            <MenuItem>Main</MenuItem>
            <MenuTrigger>
              <MenuItem />
            </MenuTrigger>
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
  const ref = React.useRef<HTMLDivElement>(null);
  const { findNextFocusable, findPrevFocusable } = useFocusFinders();

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!document.activeElement) {
      return;
    }

    if (!ref.current?.contains(document.activeElement)) {
      return;
    }

    if (e.key === 'ArrowRight') {
      const next = findNextFocusable(document.activeElement as HTMLElement, ref.current);
      next?.focus();
    }

    if (e.key === 'ArrowLeft') {
      const prev = findPrevFocusable(document.activeElement as HTMLElement, ref.current);
      prev?.focus();
    }
  };

  return (
    <div onKeyDown={onKeyDown} ref={ref} className={styles.root} {...props}>
      {props.children}
    </div>
  );
};
