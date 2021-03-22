import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillStylesProps } from '../../../../components/Pill/Pill';
import { PillVariables } from './pillVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const pillStyles: ComponentSlotStylesPrepared<PillStylesProps, PillVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      width: 'fit-content',
      height: v.height,
      maxHeight: v.height,
      borderRadius: v.borderRadius,
      background: v.background,
      margin: v.margin,
      minWidth: v.minWidth,

      ':hover': {
        background: v.backgroundHover,
      },

      ...(p.rounded && {
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

      ...getBorderFocusStyles({ variables: siteVariables }),
    };
  },
};
