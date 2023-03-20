import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { SplitButtonToggleStylesProps } from '../../../../components/SplitButton/SplitButtonToggle';
import { SplitButtonVariables } from './splitButtonVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { toggleIndicatorUrl } from './toggleIndicatorUrl';

const getIndicatorStyles = (color: string, outline: boolean, size: string): ICSSInJSStyle => {
  return {
    content: '""',
    width: size,
    height: size,
    backgroundImage: toggleIndicatorUrl(color, outline),
    backgroundRepeat: 'no-repeat',
  };
};

export const splitButtonToggleStyles: ComponentSlotStylesPrepared<SplitButtonToggleStylesProps, SplitButtonVariables> =
  {
    root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
      const { siteVariables } = theme;
      const { borderWidth } = siteVariables;

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

      const toggleButtonColorHover = () => (p.primary ? v.toggleButtonPrimaryHoverColor : v.toggleButtonColorHover);

      return {
        height: v.toggleButtonHeight,
        minWidth: v.toggleButtonHeight,
        color: v.toggleButtonColor,
        backgroundColor: v.toggleButtonBackgroundColor,
        borderRadius: v.toggleButtonBorderRadius,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        verticalAlign: 'middle',
        cursor: 'pointer',

        outline: 0,
        padding: 0,
        borderWidth,
        borderStyle: 'solid',
        borderColor: v.toggleButtonBorderColor,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: 'transparent',

        boxShadow: p.primary ? v.toggleButtonPrimaryBoxShadow : v.toggleButtonBoxShadow,
        ...((p.flat || p.size === 'small' || p.disabled) && {
          boxShadow: 'none',
        }),

        ...getIconFillOrOutlineStyles({ outline: true }),

        ':before': {
          ...getIndicatorStyles(
            p.disabled ? v.toggleButtonColorDisabled : p.primary ? v.toggleButtonPrimaryColor : v.toggleButtonColor,
            true,
            v.toggleButtonIndicatorSize,
          ),
        },

        ':hover': {
          ...getIconFillOrOutlineStyles({ outline: true }),
          color: toggleButtonColorHover(),
          backgroundColor: v.toggleButtonBackgroundColorHover,
          borderTopColor: v.toggleButtonBorderColorHover,
          borderRightColor: v.toggleButtonBorderColorHover,
          borderBottomColor: v.toggleButtonBorderColorHover,
          // ':before' styles apply to the content (chevron) part of Toggle button
          ':before': {
            ...getIndicatorStyles(toggleButtonColorHover(), true, v.toggleButtonIndicatorSize),
          },
        },

        ':active': {
          color: v.toggleButtonColorActive,
          backgroundColor: v.toggleButtonBackgroundColorActive,
          borderColor: v.toggleButtonBorderColorActive,
          boxShadow: 'none',
        },

        ':focus': borderFocusStyles[':focus'],
        ':focus-visible': {
          backgroundColor: v.toggleButtonBackgroundColorFocus,
          borderColor: v.toggleButtonBorderColorFocus,
          color: v.toggleButtonColorFocus,
          borderWidth,

          ':hover': {
            borderColor: v.toggleButtonBorderColorHover,
          },
        },

        // Overrides for "primary" split button
        ...(p.primary && {
          color: v.toggleButtonPrimaryColor,
          backgroundColor: v.toggleButtonPrimaryBackgroundColor,
          borderWidth: `0 0 0 ${siteVariables.borderWidth}`,
          borderColor: v.toggleButtonPrimaryBorderColor,

          ':active': {
            backgroundColor: v.toggleButtonPrimaryBackgroundColorActive,
            boxShadow: 'none',
          },

          ':focus': borderFocusStyles[':focus'],
          ':focus-visible': {
            backgroundColor: v.toggleButtonPrimaryBackgroundColorFocus,
          },

          ':hover': {
            color: v.toggleButtonPrimaryHoverColor,
            backgroundColor: v.toggleButtonPrimaryHoverBackgroundColor,
          },
        }),

        // Overrides for "disabled" split button
        ...(p.disabled && {
          cursor: 'default',
          color: v.toggleButtonColorDisabled,
          boxShadow: 'none',
          pointerEvents: 'none',
          ':hover': {
            color: v.toggleButtonColorDisabled,
          },

          backgroundColor: v.toggleButtonBackgroundColorDisabled,

          borderWidth: `0 0 0 ${siteVariables.borderWidth}`,
          borderColor: v.borderColorDisabled,
        }),

        ...(p.size === 'small' && {
          height: v.smallDimension,
          width: v.smallDimension,
          minWidth: v.smallMinWidth,
        }),
      };
    },
  };
