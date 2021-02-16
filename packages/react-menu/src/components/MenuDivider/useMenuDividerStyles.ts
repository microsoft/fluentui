import { ax, makeStyles } from '@fluentui/react-make-styles';
import { MenuDividerState } from './MenuDivider.types';

const useDividerStyles = makeStyles<MenuDividerState>([
  [
    null,
    theme => ({
      height: '1px',
      marginBottom: '4px',
      marginTop: '4px',
      width: '100%',
      backgroundColor: theme.alias.color.neutral.neutralStroke2,
    }),
  ],
]);

export const useMenuDividerStyles = (state: MenuDividerState) => {
  state.className = ax(useDividerStyles(state), state.className);
  
  return state
};
