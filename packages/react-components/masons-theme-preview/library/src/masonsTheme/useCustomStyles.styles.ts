import { makeStyles, mergeClasses } from '@griffel/react';
import { MenuPopoverState, MenuItemState } from '../../../../react-components/src/index';
import { CustomStyleHooksContextValue } from '../../../../react-shared-contexts/library/src/CustomStyleHooksContext';
import { tokens } from '../../../../../tokens/src/tokens';
import { acrylicTokens } from './acrylicTheme';

export const useMenuPopoverStyles = makeStyles({
  root: {
    backdropFilter: acrylicTokens.materialAcrylicBlur, //'blur(10px)',
    backgroundColor: acrylicTokens.materialAcrylicBackground, //'#FFFFFF80',
    borderRadius: tokens.borderRadiusLarge,
    border:
      'linear-gradient:(129deg, rgba:(255, 255, 255, .20) 0%, rgba:(207, 228, 250, .20) 50%, (rgba: 255, 255, 255, .20) 100%)',
  },
});

export const useMenuItemStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
});

export const useCustomMenuPopoverStyles = (state: unknown) => {
  const menuPopoverState = state as MenuPopoverState;

  const styles = useMenuPopoverStyles();

  // eslint-disable-next-line react-compiler/react-compiler
  menuPopoverState.root.className = mergeClasses(menuPopoverState.root.className, styles.root);
};

export const useCustomMenuItemStyles = (state: unknown) => {
  const menuItemState = state as MenuItemState;

  const styles = useMenuItemStyles();

  // eslint-disable-next-line react-compiler/react-compiler
  menuItemState.root.className = mergeClasses(menuItemState.root.className, styles.root);
};

export const MasonsCustomStyleHooks: CustomStyleHooksContextValue = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useMenuPopoverStyles_unstable: useCustomMenuPopoverStyles,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useMenuItemStyles_unstable: useCustomMenuItemStyles,
};
