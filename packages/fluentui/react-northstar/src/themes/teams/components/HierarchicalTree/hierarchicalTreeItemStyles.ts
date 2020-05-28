import { ICSSInJSStyle } from '@fluentui/styles';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import { hierarchicalTreeTitleClassName } from '../../../../components/HierarchicalTree/HierarchicalTreeTitle';

const hierarchicalTreeItemStyles = {
  root: ({ theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: '1px',
    ...getBorderFocusStyles({ variables: siteVariables })[':focus'],
    ':focus-visible': {
      [`> .${hierarchicalTreeTitleClassName}`]: {
        position: 'relative',
        ...getBorderFocusStyles({ variables: siteVariables })[':focus-visible'],
      },
    },
  }),
};

export default hierarchicalTreeItemStyles;
