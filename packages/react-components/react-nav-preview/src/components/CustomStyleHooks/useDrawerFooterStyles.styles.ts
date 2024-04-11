import { DrawerFooterState } from '@fluentui/react-drawer';
import { mergeClasses } from '@griffel/react';
import { useSharedNavBackgroundStyles } from './navCustomStyles.styles';

export const useNavDrawerFooterStyles = (state: unknown) => {
  const styles = useSharedNavBackgroundStyles();

  const drawerFooterState = state as DrawerFooterState;

  drawerFooterState.root.className = mergeClasses(drawerFooterState.root.className, styles.base);
};
