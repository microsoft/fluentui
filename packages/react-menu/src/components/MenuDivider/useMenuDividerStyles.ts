import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuDividerState } from './MenuDivider.types';

const useStyles = makeStyles({
  root: theme => ({
    height: '1px',
    margin: '4px -5px 4px -5px',
    width: 'auto',
    backgroundColor: theme.alias.color.neutral.neutralStroke2,
  }),
});

export const useMenuDividerStyles = (state: MenuDividerState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  return state;
};
