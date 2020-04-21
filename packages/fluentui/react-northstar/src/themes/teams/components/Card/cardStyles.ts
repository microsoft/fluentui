import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';
import getBorderFocusStyles from '../../getBorderFocusStyles';

const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, CardVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: v.borderRadius,
    });

    return {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: v.padding,
      width: v.width,
      height: v.height,
      backgroundColor: v.backgroundColor,
      boxShadow: v.boxShadow,
      ':hover': {
        backgroundColor: v.backgroundColorHover,
        boxShadow: v.boxShadowHover,
      },

      borderWidth: v.borderWidth,
      borderStyle: v.borderStyle,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,

      ...(p.size === 'small' && { width: v.sizeSmallWidth, height: v.sizeSmallHeight, padding: v.sizeSmallPadding }),
      ...(p.size === 'large' && { width: v.sizeLargeWidth, height: v.sizeLargeHeight, padding: v.sizeLargePadding }),
      ...(p.fluid && { width: v.fluidWidth, height: v.fluidHeight }),
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(p.compact && { padding: v.compactPadding }),
      ...(p.centered && { alignItems: 'center' }),

      ...(p.actionable && {
        cursor: 'pointer',
        ':focus-visible': {
          backgroundColor: v.backgroundColorFocus,
          boxShadow: v.boxShadowFocus,
        },
        ':active': {
          backgroundColor: v.backgroundColorPressed,
          boxShadow: v.boxShadowPressed,
        },
      }),

      ...(p.disabled && {
        cursor: 'not-allowed',
        color: v.colorDisabled,
        backgroundColor: v.backgroundColorDisabled,
        borderColor: v.borderColorDisabled,
        boxShadow: v.boxShadowDisabled,
        ':hover': {
          backgroundColor: v.backgroundColorDisabled,
          boxShadow: v.boxShadowDisabled,
        },
        ':focus-visible': {
          backgroundColor: v.backgroundColorDisabled,
          boxShadow: v.boxShadowDisabled,
        },
        ':active': {
          backgroundColor: v.backgroundColorDisabled,
          boxShadow: v.boxShadowDisabled,
        },
      }),

      ...borderFocusStyles,
    };
  },
};

export default cardStyles;
