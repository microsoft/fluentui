import { tokens } from '@fluentui/react-theme';
import { acrylicTokens } from '../masonsTheme/acrylicTheme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { MenuPopoverState } from '../../../../react-components/src/index';

export const useMenuPopoverStyles = makeStyles({
  root: {
    backdropFilter: acrylicTokens.blurAcrylicBackground,
    backgroundColor: acrylicTokens.colorAcrylicBackground,
    borderRadius: tokens.borderRadiusLarge,
  },
});

export const useCustomMenuPopoverStyles = (state: unknown) => {
  const menuPopoverState = state as MenuPopoverState;

  const styles = useMenuPopoverStyles();

  // eslint-disable-next-line react-compiler/react-compiler
  menuPopoverState.root.className = mergeClasses(menuPopoverState.root.className, styles.root);
};
