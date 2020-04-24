import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import getBorderFocusStyles from '../../getBorderFocusStyles';
import { TreeTitleStylesProps } from '../../../../components/Tree/TreeTitle';
import { TreeTitleVariables } from './treeTitleVariables';
import { pxToRem } from '../../../../utils';
import checkboxIndicatorUrl from '../Checkbox/checkboxIndicatorUrl';
import checkboxIndicatorIndeterminatedUrl from './checkboxIndicatorIndeterminatedUrl';

const treeTitleStyles: ComponentSlotStylesPrepared<TreeTitleStylesProps, TreeTitleVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    padding: v.padding,
    cursor: 'pointer',
    color: v.color,
    position: 'relative',
    ...(p.selectable && {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    ...getBorderFocusStyles({ variables: siteVariables }),
  }),

  selectionIndicator: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    float: 'right',
    verticalAlign: 'middle',
    boxShadow: 'unset',
    width: pxToRem(16),
    height: pxToRem(16),

    borderColor: v.borderColor,
    borderStyle: v.borderStyle,
    borderRadius: v.borderRadius,
    borderWidth: v.borderWidth,
    color: v.indicatorColor,
    margin: v.selectionIndicatorMargin,
    padding: v.padding,
    userSelect: 'none',

    backgroundImage: checkboxIndicatorUrl(v.indicatorColor, v.background),
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    ...(p.selected && {
      borderColor: v.checkedBorderColor,
      backgroundImage: checkboxIndicatorUrl(v.checkedIndicatorColor, v.checkedBackground),
    }),

    ...(p.indeterminate && {
      borderColor: v.checkedBorderColor,
      backgroundImage: checkboxIndicatorIndeterminatedUrl(v.checkedIndicatorColor, v.checkedBackground),
    }),

    ...(p.disabled && {
      background: v.disabledBackground,
      borderColor: v.disabledBorderColor,
    }),

    ...(p.disabled &&
      p.selected && {
        color: v.disabledCheckedIndicatorColor,
        borderColor: v.disabledBackgroundChecked,
        backgroundImage: checkboxIndicatorUrl(v.disabledCheckedIndicatorColor, v.disabledBackgroundChecked),
      }),
  }),
};

export default treeTitleStyles;
