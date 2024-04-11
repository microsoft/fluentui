import { DrawerBodyState } from '@fluentui/react-drawer';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useSharedNavBackgroundStyles } from './navCustomStyles.styles';

const useBodyStyles = makeStyles({
  base: {
    backgroundImage: 'unset', // remove the good hack in default useDrawerBodyStyles_unstable since it adds divider lines we don't want
  },
});

export const useNavDrawerBodyStyles = (state: unknown) => {
  const styles = useSharedNavBackgroundStyles();
  const bodyStyles = useBodyStyles();

  const drawerBodyState = state as DrawerBodyState;

  drawerBodyState.root.className = mergeClasses(drawerBodyState.root.className, styles.base, bodyStyles.base);
};
