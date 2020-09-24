import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { TreeItemStylesProps } from '../../../../components/Tree/TreeItem';
import { treeTitleClassName } from '../../../../components/Tree/TreeTitle';

export const treeItemStyles: ComponentSlotStylesPrepared<TreeItemStylesProps> = {
  root: ({ theme: { siteVariables }, props: p }): ICSSInJSStyle => ({
    listStyleType: 'none',
    ...getBorderFocusStyles({ variables: siteVariables })[':focus'],
    ':focus-visible': {
      outline: 0,
      [`> .${treeTitleClassName}`]: {
        position: 'relative',
        ...getBorderFocusStyles({ variables: siteVariables })[':focus-visible'],
      },
    },
  }),
};
