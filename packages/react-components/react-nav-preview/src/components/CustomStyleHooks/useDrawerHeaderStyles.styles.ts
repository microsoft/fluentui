import { DrawerHeaderState } from '@fluentui/react-drawer';
import { mergeClasses } from '@griffel/react';
import { useSharedNavBackgroundStyles } from './navCustomStyles.styles';

export const useNavDrawerHeaderStyles = (state: unknown) => {
  const styles = useSharedNavBackgroundStyles();

  const drawerHeaderState = state as DrawerHeaderState;

  drawerHeaderState.root.className = mergeClasses(drawerHeaderState.root.className, styles.base);
};
