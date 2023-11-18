import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillStylesProps } from '../../../../components/Pill/Pill';
import { PillVariables } from './pillVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const pillStyles: ComponentSlotStylesPrepared<PillStylesProps, PillVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      width: 'fit-content',
      position: 'relative',
      height: v.height,
      maxHeight: v.height,
      borderRadius: v.borderRadius,
      background: v.background,
      margin: v.margin,
      minWidth: v.minWidth,

      ':hover': {
        background: v.backgroundHover,
      },

      ...(p.rectangular && {
        borderRadius: v.roundedBorderRadius,
        ...((p.size === 'small' || p.size === 'smaller') && {
          borderRadius: v.smallerRoundedBorderRadius,
        }),
      }),

      ...(p.size === 'smaller' && {
        minWidth: v.smallerMinWidth,
        margin: v.smallerMargin,
        height: v.smallerHeight,
        maxHeight: v.smallerHeight,
      }),

      ...(p.size === 'small' && {
        minWidth: v.smallMinWidth,
        margin: v.smallMargin,
        height: v.smallHeight,
        maxHeight: v.smallHeight,
      }),

      ...(p.disabled && {
        pointerEvents: 'none',
        cursor: 'not-allowed',
        background: v.disabledBackground,
        color: v.disabledColor,
        ':hover': {
          background: v.disabledBackground,
        },
      }),

      ...(p.appearance === 'outline' && {
        borderWidth: '1px',
        borderStyle: 'solid',
        background: v.outlineBackground,
        borderColor: v.outlineBorderColor,
        ':hover': {
          background: v.outlineBackground,
        },
        ...(p.disabled && {
          borderColor: v.outlineDisabledborder,
        }),
      }),

      ...(p.appearance === 'inverted' && {
        background: v.invertedBackground,
        ':hover': {
          background: v.invertedBackground,
        },
        ...(p.disabled && {
          background: v.disabledBackground,
        }),
      }),

      ...(p.selectable && {
        cursor: 'pointer',
        ...(p.selected && {
          background: 'transparent',
          boxShadow: `inset ${v.selectedIconColor} 0px 0px 0px 1px`,
        }),
      }),

      ...(p.actionable && {
        cursor: 'pointer',
      }),

      ...getBorderFocusStyles({ variables: siteVariables }),
    };
  },
};
