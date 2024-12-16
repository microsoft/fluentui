import { makeStyles, mergeClasses } from '@griffel/react';
import { MenuGroupHeaderState } from '../../../../react-components/src/index';

export const useMenuGroupHeaderStyles = makeStyles({
  root: {
    padding: '12px 8px',
  },
});

export const useCustomMenuGroupHeaderStyles = (state: unknown) => {
  const menuGroupHeaderState = state as MenuGroupHeaderState;

  const styles = useMenuGroupHeaderStyles();

  // eslint-disable-next-line react-compiler/react-compiler
  menuGroupHeaderState.root.className = mergeClasses(menuGroupHeaderState.root.className, styles.root);
};
