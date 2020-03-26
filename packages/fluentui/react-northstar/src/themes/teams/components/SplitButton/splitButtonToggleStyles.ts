import { unstable_createAnimationStyles as createAnimationStyles } from '@fluentui/react-bindings';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { SplitButtonToggleStylesProps } from '../../../../components/SplitButton/SplitButtonToggle';
import { SplitButtonVariables } from './splitButtonVariables';
import getBorderFocusStyles from '../../getBorderFocusStyles';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';
import toggleIndicatorUrl from './toggleIndicatorUrl';

const getIndicatorStyles = (color: string, outline: boolean, size: string): ICSSInJSStyle => {
  return {
    content: '""',
    width: size,
    height: size,
    backgroundImage: toggleIndicatorUrl(color, outline),
    backgroundRepeat: 'no-repeat',
  };
};

const splitButtonToggleStyles: ComponentSlotStylesPrepared<SplitButtonToggleStylesProps, SplitButtonVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderPadding: borderWidth,
    });

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
      boxShadow: v.toggleButtonBoxShadow,

      ':before': {
        ...getIndicatorStyles(
          p.disabled ? v.toggleButtonColorDisabled : p.primary ? v.toggleButtonPrimaryColor : v.toggleButtonColor,
          true,
          v.toggleButtonIndicatorSize,
        ),
      },

      ':hover': {
        ...getIconFillOrOutlineStyles({ outline: false }),
        ':before': {
          ...getIndicatorStyles(v.toggleButtonColorHover, false, v.toggleButtonIndicatorSize),
        },
        color: v.toggleButtonColorHover,
        background: v.toggleButtonBackgroundColorHover,
      },

      ':active': {
        ...createAnimationStyles('scaleDownSoft', theme),
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

      // Overrides for "primary" buttons
      ...(p.primary && {
        color: v.toggleButtonPrimaryColor,
        backgroundColor: v.toggleButtonPrimaryBackgroundColor,
        borderColor: v.toggleButtonPrimaryBorderColor,
        boxShadow: v.toggleButtonPrimaryBoxShadow,

        ':active': {
          ...createAnimationStyles('scaleDownSoft', theme),
          backgroundColor: v.toggleButtonPrimaryBackgroundColorActive,
          boxShadow: 'none',
        },

        ':focus': borderFocusStyles[':focus'],
        ':focus-visible': {
          backgroundColor: v.toggleButtonPrimaryBackgroundColorFocus,
        },
      }),

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        cursor: 'default',
        color: v.toggleButtonColorDisabled,
        boxShadow: 'none',
        pointerEvents: 'none',
        ':hover': {
          color: v.toggleButtonColorDisabled,
        },

        backgroundColor: v.toggleButtonBackgroundColorDisabled,
        borderColor: v.toggleButtonBorderColorDisabled,
      }),
    };
  },
};

export default splitButtonToggleStyles;
