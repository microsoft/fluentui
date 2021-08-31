import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuGroupHeaderState } from './MenuGroupHeader.types';

const useStyles = makeStyles({
  root: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    color: theme.alias.color.neutral.neutralForeground3,
    paddingLeft: '12px',
    paddingRight: '12px',
    fontWeight: theme.global.type.fontWeights.semibold,
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
