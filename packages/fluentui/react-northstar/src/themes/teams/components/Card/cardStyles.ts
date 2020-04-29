import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';
import { cardExpandableBoxClassName } from '../../../../components/Card/CardExpandableBox';
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
      margin: v.margin,
      width: v.width,
      height: v.height,
      backgroundColor: v.backgroundColor,
      boxShadow: v.boxShadow,
      ':hover': {
        backgroundColor: v.backgroundColorHover,
        borderColor: v.borderColorHover,
        boxShadow: v.boxShadowHover,
      },
      ...borderFocusStyles,

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
          ...borderFocusStyles[':focus-visible'],
        },
        ':active': {
          backgroundColor: v.backgroundColorPressed,
          borderColor: v.borderColorPressed,
          boxShadow: v.boxShadowPressed,
        },
      }),
      ...(p.selected && {
        backgroundColor: v.backgroundColorSelected,
        borderColor: v.borderColorSelected,
        boxShadow: v.boxShadowSelected,
      }),

      ...(p.elevated && {
        boxShadow: v.elevatedBoxShadow,
        ':hover': {
          boxShadow: v.elevatedBoxShadowHover,
        },

        ...(p.actionable && {
          ':focus-visible': {
            boxShadow: v.elevatedBoxShadowFocus,
            ...borderFocusStyles[':focus-visible'],
          },
          ':active': {
            boxShadow: v.elevatedBoxShadowPressed,
          },
        }),
      }),

      ...(p.inverted && {
        backgroundColor: v.invertedBackgroundColor,
        ':hover': {
          backgroundColor: v.invertedBackgroundColorHover,
        },

        ...(p.actionable && {
          ':focus-visible': {
            backgroundColor: v.invertedBackgroundColorFocus,
            ...borderFocusStyles[':focus-visible'],
          },
          ':active': {
            backgroundColor: v.invertedBackgroundColorPressed,
          },
        }),
      }),

      ...(p.quiet && {
        backgroundColor: v.quietBackgroundColor,
        ':hover': {
          backgroundColor: v.quietBackgroundColorHover,
        },

        ...(p.actionable && {
          ':focus-visible': {
            backgroundColor: v.quietBackgroundColorFocus,
            ...borderFocusStyles[':focus-visible'],
          },
          ':active': {
            backgroundColor: v.quietBackgroundColorPressed,
          },
        }),
      }),

      ...(p.disabled && {
        cursor: 'not-allowed',
        color: v.colorDisabled,
        backgroundColor: v.backgroundColorDisabled,
        borderColor: v.borderColorDisabled,
        boxShadow: v.boxShadowDisabled,
        ...(p.inverted && {
          backgroundColor: v.invertedBackgroundColorDisabled,
        }),
        ...(p.quiet && {
          backgroundColor: v.quietBackgroundColorDisabled,
        }),
        ':hover': {
          boxShadow: v.boxShadowDisabled,
        },
        ':focus-visible': {
          boxShadow: v.boxShadowDisabled,
          ...borderFocusStyles[':focus-visible'],
        },
        ':active': {
          boxShadow: v.boxShadowDisabled,
        },
      }),

      ...(p.expandable && {
        [`& .${cardExpandableBoxClassName}`]: {
          maxHeight: v.expandableBoxStartMaxHeight,
          transition: v.expandableBoxExpandTransition,
          overflow: 'hidden',
        },
        [`&:hover .${cardExpandableBoxClassName}`]: {
          maxHeight: v.expandableBoxEndMaxHeight,
          transition: v.expandableBoxExpandTransition,
        },
        [`&:focus .${cardExpandableBoxClassName}`]: {
          maxHeight: v.expandableBoxEndMaxHeight,
          transition: v.expandableBoxExpandTransition,
        },
      }),
    };
  },
};

export default cardStyles;
