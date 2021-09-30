import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuDividerState } from './MenuDivider.types';

const useStyles = makeStyles({
  root: theme => ({
    height: '1px',
    marginBottom: '4px',
    marginTop: '4px',
    width: '100%',
    backgroundColor: theme.colorNeutralStroke2,
  }),
});

export const useMenuDividerStyles = (state: MenuDividerState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  return state;
};
