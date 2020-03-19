import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import getBorderFocusStyles from '../../getBorderFocusStyles';
import { TreeTitleStylesProps } from '../../../../components/Tree/TreeTitle';
import { TreeTitleVariables } from './treeTitleVariables';

const treeTitleStyles: ComponentSlotStylesPrepared<TreeTitleStylesProps, TreeTitleVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: v.padding,
    cursor: 'pointer',
    color: v.color,
    position: 'relative',
    ...getBorderFocusStyles({ variables: siteVariables }),
  }),
};

export default treeTitleStyles;
