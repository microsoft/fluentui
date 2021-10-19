import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuGroupHeaderState } from './MenuGroupHeader.types';

const useStyles = makeStyles({
  root: theme => ({
    fontSize: theme.fontSizeBase200,
    color: theme.colorNeutralForeground3,
    paddingLeft: '12px',
    paddingRight: '12px',
    fontWeight: theme.fontWeightSemibold,
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  }),
});

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);

  return state;
};
