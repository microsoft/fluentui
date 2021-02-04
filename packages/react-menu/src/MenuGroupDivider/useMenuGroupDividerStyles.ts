import { makeStyles, ax } from '@fluentui/react-make-styles';
import { MenuGroupDividerState } from './MenuGroupDivider.types';

const useDividerStyles = makeStyles([
  [
    null,
    theme => ({
      height: '1px',
      marginBottom: '4px',
      marginTop: '4px',
      width: '100%',
      backgroundColor: theme.neutralColorTokens.neutralStroke2,
    }),
  ],
]);

export const useMenuGroupDividerStyles = (state: MenuGroupDividerState) => {
  state.className = ax(useDividerStyles({}), state.className);
};
