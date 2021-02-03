import { makeStyles } from '@fluentui/react-make-styles';
import { MenuGroupHeaderState } from './MenuGroupHeader.types';

const useHeaderStyles = makeStyles([
  [
    null,
    theme => ({
      fontSize: theme.fontSizes.base[200],
      color: theme.neutralColorTokens.neutralForeground3,
      paddingLeft: '12px',
      fontWeight: theme.fontWeights.semibold,
      height: '32px',
      display: 'flex',
      alignItems: 'center',
    }),
  ],
]);

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState) => {
  state.className = useHeaderStyles({});
};
