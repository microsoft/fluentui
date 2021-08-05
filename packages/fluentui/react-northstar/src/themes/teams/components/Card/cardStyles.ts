import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CardVariables } from './cardVariables';
import { CardStylesProps } from '../../../../components/Card/Card';
import { cardExpandableBoxClassName } from '../../../../components/Card/CardExpandableBox';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const cardStyles: ComponentSlotStylesPrepared<CardStylesProps, CardVariables> = {
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
      borderWidth: v.borderWidth,
      borderStyle: v.borderStyle,
      borderColor: v.borderColor,
      borderRadius: v.borderRadius,
      backgroundColor: v.backgroundColor,
      ...(p.ghost && {
        backgroundColor: v.ghostBackgroundColor,
      }),

      ...(p.inverted && {
        backgroundColor: v.invertedBackgroundColor,
      }),

      ...(p.selected && {
        backgroundColor: v.selectedBackgroundColor,
      }),

      boxShadow: v.boxShadow,

      ...(p.elevated && {
        boxShadow: v.elevatedBoxShadow,
      }),

      ':hover': {
        backgroundColor: v.backgroundColorHover,
        ...(p.ghost && {
          backgroundColor: v.ghostBackgroundColorHover,
        }),
        ...(p.inverted && {
          backgroundColor: v.invertedBackgroundColorHover,
        }),
        ...(p.selected && {
          backgroundColor: v.selectedBackgroundColorHover,
        }),

        borderColor: v.borderColorHover,
        boxShadow: v.boxShadowHover,
        ...(p.elevated && {
          boxShadow: v.elevatedBoxShadowHover,
        }),
      },
      ...borderFocusStyles,

      ...(p.actionable && {
        cursor: 'pointer',
        ':focus-visible': {
          backgroundColor: v.backgroundColorFocus,
          ...(p.ghost && {
            backgroundColor: v.ghostBackgroundColorFocus,
          }),
          ...(p.inverted && {
            backgroundColor: v.invertedBackgroundColorFocus,
          }),
          ...(p.selected && {
            backgroundColor: v.selectedBackgroundColorFocus,
          }),

          boxShadow: v.boxShadowFocus,
          ...(p.elevated && {
            boxShadow: v.elevatedBoxShadowFocus,
          }),

          ...borderFocusStyles[':focus-visible'],
        },
        ':active': {
          backgroundColor: v.backgroundColorPressed,
          ...(p.ghost && {
            backgroundColor: v.ghostBackgroundColorPressed,
          }),
          ...(p.inverted && {
            backgroundColor: v.invertedBackgroundColorPressed,
          }),
          ...(p.selected && {
            backgroundColor: v.selectedBackgroundColorPressed,
          }),

          borderColor: v.borderColorPressed,
          boxShadow: v.boxShadowPressed,
          ...(p.elevated && {
            boxShadow: v.elevatedBoxShadowPressed,
          }),
        },
      }),

      ...(p.size === 'small' && { width: v.sizeSmallWidth, height: v.sizeSmallHeight, padding: v.sizeSmallPadding }),
      ...(p.size === 'large' && { width: v.sizeLargeWidth, height: v.sizeLargeHeight, padding: v.sizeLargePadding }),
      ...(p.fluid && { width: v.fluidWidth, height: v.fluidHeight }),
      ...(p.horizontal && { flexDirection: 'row' }),
      ...(p.compact && { padding: v.compactPadding }),
      ...(p.centered && { alignItems: 'center' }),

      ...(p.disabled && {
        cursor: 'not-allowed',
        color: v.colorDisabled,
        backgroundColor: v.backgroundColorDisabled,
        borderColor: v.borderColorDisabled,
        boxShadow: v.boxShadowDisabled,
        ...(p.inverted && {
          backgroundColor: v.invertedBackgroundColorDisabled,
        }),
        ...(p.ghost && {
          backgroundColor: v.ghostBackgroundColorDisabled,
        }),
        ...(p.selected && {
          backgroundColor: v.selectedBackgroundColorDisabled,
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
