import { ICSSInJSStyle } from '@fluentui/styles';
import getBorderFocusStyles from '../../getBorderFocusStyles';

const hierarchicalTreeTitleStyles = {
  root: ({ variables, theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    paddingLeft: 0,
    paddingTop: '1px',
    paddingRight: 0,
    paddingBottom: '1px',
    cursor: 'pointer',
    color: variables.defaultColor,
    position: 'relative',
    ...getBorderFocusStyles({ variables: siteVariables }),
  }),
};

export default hierarchicalTreeTitleStyles;
