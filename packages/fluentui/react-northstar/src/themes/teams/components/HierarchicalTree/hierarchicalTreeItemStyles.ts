import { ICSSInJSStyle } from '@fluentui/styles';
import { pxToRem } from '../../../../utils';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import { hierarchicalTreeTitleClassName } from '../../../../components/HierarchicalTree/HierarchicalTreeTitle';

const hierarchicalTreeItemStyles = {
  root: ({ theme: { siteVariables } }): ICSSInJSStyle => ({
    listStyleType: 'none',
    padding: `0 0 0 ${pxToRem(1)}`,
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
