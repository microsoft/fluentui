import { shorthands, mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuDividerState } from './MenuDivider.types';

export const menuDividerClassName = 'fui-MenuDivider';

const useStyles = makeStyles({
  root: theme => ({
    height: '1px',
    ...shorthands.margin('4px', '-5px', '4px', '-5px'),
    width: 'auto',
    backgroundColor: theme.colorNeutralStroke2,
  }),
});

export const useMenuDividerStyles = (state: MenuDividerState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuDividerClassName, styles.root, state.root.className);

  return state;
};
