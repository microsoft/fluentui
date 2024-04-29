import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import {
  AlertDismissActionStylesProps,
  alertDismissActionSlotClassNames,
} from '../../../../components/Alert/AlertDismissAction';
import { AlertVariables } from './alertVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { dismissIndicatorUrl } from './dismissIndicatorUrl';
import { getIntentColorsFromProps } from './alertStyles';
import { faster } from '../../animations/durations';

const getIndicatorStyles = (color: string, outline: boolean, size: string): ICSSInJSStyle => {
  return {
    width: size,
    height: size,
    backgroundImage: dismissIndicatorUrl(color, outline),
    backgroundRepeat: 'no-repeat',
  };
};

export const alertDismissActionStyles: ComponentSlotStylesPrepared<AlertDismissActionStylesProps, AlertVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;
    const { color: dismissActionIndicatorColor } = getIntentColorsFromProps(p, v);

    const borderFocusStyles = getBorderFocusStyles({
      variables: {
        borderRadius: v.focusBorderRadius,
        borderWidth: v.focusBorderWidth,
        focusInnerBorderColor: v.focusInnerBorderColor,
        focusOuterBorderColor: v.focusOuterBorderColor,
        zIndexes: { foreground: v.focusBorderZIndex },
      },
      borderPadding: borderWidth,
    });

    return {
      height: v.dismissActionSize,
      minWidth: v.dismissActionSize,
      color: v.dismissActionColor || 'currentColor',
      outline: 0,
      padding: 0,
      borderWidth: 0,
      backgroundColor: v.dismissActionBackgroundColor,
      borderRadius: v.borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: faster,

      ...getIconFillOrOutlineStyles({ outline: true }),

      ...(!p.hasContent && {
        [`& .${alertDismissActionSlotClassNames.content}`]: {
          ...getIndicatorStyles(dismissActionIndicatorColor, true, v.dismissActionIndicatorSize),
        },
      }),

      ':hover': {
        backgroundColor: v.hoverBackgroundColor,
        color: 'currentColor',
        ...getIconFillOrOutlineStyles({ outline: false }),

        ...(!p.hasContent && {
          [`& .${alertDismissActionSlotClassNames.content}`]: {
            ...getIndicatorStyles(dismissActionIndicatorColor, false, v.dismissActionIndicatorSize),
          },
        }),

        ...getBorderFocusStyles({
          variables: {
            borderRadius: v.dismissActionHoverBorderRadius,
            borderWidth: v.dismissActionHoverBorderWidth,
            focusInnerBorderColor: v.dismissActionHoverInnerBorderColor,
            focusOuterBorderColor: v.dismissActionHoverOuterBorderColor,
            zIndexes: { foreground: v.dismissActionHoverZIndex },
          },
        })[':focus-visible'],
      },

      ':focus': borderFocusStyles[':focus'],
      ':focus-visible': {
        backgroundColor: v.focusBackgroundColor,
        borderColor: v.dismissActionBorderColorFocus,
        color: v.dismissActionColorFocus,
        borderWidth,
        ...borderFocusStyles[':focus-visible'],
        ...getIconFillOrOutlineStyles({ outline: false }),

        ...(!p.hasContent && {
          [`& .${alertDismissActionSlotClassNames.content}`]: {
            ...getIndicatorStyles(dismissActionIndicatorColor, false, v.dismissActionIndicatorSize),
          },
        }),

        ':hover': {
          borderColor: v.dismissActionBorderColorHover,
        },
      },

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.dismissActionColorDisabled,
        boxShadow: 'none',
        pointerEvents: 'none',
        ':hover': {
          color: v.dismissActionColorDisabled,
        },

        backgroundColor: v.dismissActionBackgroundColorDisabled,
        borderColor: v.dismissActionBorderColorDisabled,
      }),
    };
  },
  content: ({ props: p, variables: v }) => {
    const { color: dismissActionIndicatorColor } = getIntentColorsFromProps(p, v);
    return {
      fontWeight: v.dismissActionContentFontWeight,
      ...(!p.hasContent && {
        ...getIndicatorStyles(dismissActionIndicatorColor, false, v.dismissActionIndicatorSize),
      }),
    };
  },
};
