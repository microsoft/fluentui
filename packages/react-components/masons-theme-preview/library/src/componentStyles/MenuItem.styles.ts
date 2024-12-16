import { makeStyles, mergeClasses } from '@griffel/react';
import { MenuItemState } from '../../../../react-components/src/index';

export const useMenuItemStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
});

export const useCustomMenuItemStyles = (state: unknown) => {
  const menuItemState = state as MenuItemState;

  const styles = useMenuItemStyles();

  // eslint-disable-next-line react-compiler/react-compiler
  menuItemState.root.className = mergeClasses(menuItemState.root.className, styles.root);
};
