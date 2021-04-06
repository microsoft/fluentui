import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { MenuGroupHeaderState } from './MenuGroupHeader.types';

const useStyles = makeStyles({
  root: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
    color: theme.alias.color.neutral.neutralForeground3,
    paddingLeft: '12px',
    fontWeight: theme.global.type.fontWeights.semibold,
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  }),
});

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState) => {
  const styles = useStyles();
  state.className = useAx(styles.root, state.className);

  return state;
};
