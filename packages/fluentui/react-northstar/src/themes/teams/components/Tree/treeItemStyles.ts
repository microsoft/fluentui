import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { TreeItemStylesProps } from '../../../../components/Tree/TreeItem';
import { treeTitleClassName, treeTitleSlotClassNames } from '../../../../components/Tree/TreeTitle';

export const treeItemStyles: ComponentSlotStylesPrepared<TreeItemStylesProps> = {
  root: ({ theme: { siteVariables }, props: p }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({ variables: siteVariables });
    return {
      listStyleType: 'none',

      ':focus': {
        ...(p.selectable && {
          [`& .${treeTitleSlotClassNames.indicator}`]: {
            display: 'inline-block',
          },
        }),
        ...borderFocusStyles[':focus'],
      },
      ':focus-visible': {
        outline: 0,
        ...(p.selectable && {
          [`& .${treeTitleSlotClassNames.indicator}`]: {
            display: 'inline-block',
          },
        }),
        [`> .${treeTitleClassName}`]: {
          position: 'relative',
          ...borderFocusStyles[':focus-visible'],
        },
      },
    };
  },
};
