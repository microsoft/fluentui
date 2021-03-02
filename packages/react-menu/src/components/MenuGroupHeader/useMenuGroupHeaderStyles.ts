import { makeStyles, ax } from '@fluentui/react-make-styles';
import { MenuGroupHeaderState } from './MenuGroupHeader.types';

const useHeaderStyles = makeStyles([
  [
    null,
    (theme) => ({
      fontSize: theme.global.type.fontSizes.base[200],
      color: theme.alias.color.neutral.neutralForeground3,
      paddingLeft: '12px',
      fontWeight: theme.global.type.fontWeights.semibold,
      height: '32px',
      display: 'flex',
      alignItems: 'center',
    }),
  ],
]);

export const useMenuGroupHeaderStyles = (state: MenuGroupHeaderState) => {
  state.className = ax(useHeaderStyles({}), state.className);

  return state;
};
