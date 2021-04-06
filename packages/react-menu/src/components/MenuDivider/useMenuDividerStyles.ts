import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { MenuDividerState } from './MenuDivider.types';

const useStyles = makeStyles({
  root: theme => ({
    height: '1px',
    marginBottom: '4px',
    marginTop: '4px',
    width: '100%',
    backgroundColor: theme.alias.color.neutral.neutralStroke2,
  }),
});

export const useMenuDividerStyles = (state: MenuDividerState) => {
  const styles = useStyles();
  state.className = useAx(styles.root, state.className);

  return state;
};
