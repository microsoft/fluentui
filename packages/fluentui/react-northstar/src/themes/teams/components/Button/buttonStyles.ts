import * as _ from 'lodash';
import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { loaderSlotClassNames } from '../../../../components/Loader/Loader';
import { ButtonStylesProps } from '../../../../components/Button/Button';
import { ButtonVariables } from './buttonVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { faster, ultraFast } from '../../animations/durations';

export const buttonStyles: ComponentSlotStylesPrepared<ButtonStylesProps, ButtonVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderRadius: siteVariables.borderRadiusMedium,
      borderPadding: borderWidth,
      ...(p.circular && {
        borderPadding: pxToRem(4),
      }),
    });

    return {
      height: v.height,
      minWidth: _.isNil(p.loading) ? v.minWidth : v.loadingMinWidth,
      maxWidth: v.maxWidth,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderRadius: v.borderRadius,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: v.padding,
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: faster,
      userSelect: 'none',

      ...(!(p.text || p.flat || p.size === 'small') && {
        ...(p.primary && {
          boxShadow: v.primaryBoxShadow,
        }),
        ...(!p.primary && {
          boxShadow: v.boxShadow,
        }),
      }),

      ...(p.size === 'small' && {
        padding: v.sizeSmallPadding,
        height: v.sizeSmallHeight,
        minWidth: v.sizeSmallMinWidth,
      }),

      // rectangular button defaults
      ...(!p.text && {
        outline: 0,
        borderWidth,
        borderStyle: 'solid',
        borderColor: v.borderColor,

        ':hover': {
          color: v.colorHover,
          backgroundColor: v.backgroundColorHover,
          borderColor: v.borderColorHover,
        },

        ...(!p.disabledFocusable && {
          ':active': {
            transition: ultraFast,
            color: v.colorActive,
            backgroundColor: v.backgroundColorActive,
            borderColor: v.borderColorActive,
            boxShadow: 'none',
          },
        }),

        ':focus': borderFocusStyles[':focus'],
        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          backgroundColor: v.backgroundColorFocus,
          borderColor: v.borderColorFocus,
          color: v.colorFocus,
          borderWidth,

          ':hover': {
            borderColor: v.borderColorHover,
          },
        },
      }),

      // circular button defaults
      ...(p.circular &&
        !p.text && {
          minWidth: v.height,
          padding: 0,
          borderRadius: v.circularBorderRadius,

          ...(p.size === 'small' && {
            minWidth: v.sizeSmallHeight,
          }),
        }),

      // text button defaults
      ...(p.text && {
        color: v.textColor,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        padding: `0 ${pxToRem(8)}`,

        // by default icons should always be outline, but filled on hover/focus
        ...getIconFillOrOutlineStyles({ outline: true }),

        ':hover': {
          color: v.textColorHover,
          ...getIconFillOrOutlineStyles({ outline: false }),
        },
        ':active': {
          color: siteVariables.colorScheme.brand.backgroundPressed,
        },
        ':focus': {
          boxShadow: 'none',
          ...borderFocusStyles[':focus'],
        },
        ':focus-visible': borderFocusStyles[':focus-visible'],

        ...(p.primary && {
          color: v.textPrimaryColor,
        }),
      }),

      // Overrides for "primary" buttons
      ...(p.primary &&
        !p.text && {
          color: v.primaryColor,
          backgroundColor: v.primaryBackgroundColor,
          borderColor: v.primaryBorderColor,

          ...(!p.disabledFocusable && {
            ':active': {
              transition: ultraFast,
              backgroundColor: v.primaryBackgroundColorActive,
              boxShadow: 'none',
            },
          }),

          ':focus': borderFocusStyles[':focus'],
          ':focus-visible': {
            ...borderFocusStyles[':focus-visible'],
            backgroundColor: v.primaryBackgroundColorFocus,
          },

          ':hover': {
            color: v.primaryColorHover,
            backgroundColor: v.primaryBackgroundColorHover,
          },
        }),

      ...(p.inverted && {
        backgroundColor: siteVariables.colorScheme.silver.background,
        borderColor: siteVariables.colorScheme.silver.border,
        color: siteVariables.colorScheme.silver.foreground,

        ...(!p.disabledFocusable && {
          ':active': {
            transition: ultraFast,
            backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
            color: siteVariables.colorScheme.silver.foregroundHover,
          },
        }),

        ':hover': {
          backgroundColor: siteVariables.colorScheme.silver.backgroundHover,
          color: siteVariables.colorScheme.silver.foregroundHover,
        },

        ':focus': {
          ...borderFocusStyles[':focus'],
          boxShadow: 'none',
        },

        ':focus-visible': {
          ...borderFocusStyles[':focus-visible'],
          ...(!p.disabledFocusable && {
            backgroundColor: siteVariables.colorScheme.silver.backgroundPressed,
            color: siteVariables.colorScheme.silver.foregroundHover,
          }),
        },
      }),

      ...(p.tinted && {
        backgroundColor: v.tintedBackgroundColor,
        borderColor: v.tintedBorderColor,
        color: v.tintedColor,

        ...(!p.disabledFocusable && {
          ':active': {
            transition: ultraFast,
            backgroundColor: v.tintedBackgroundColorActive,
          },
        }),

        ':hover': {
          color: v.tintedColorHover,
          backgroundColor: v.tintedBackgroundColorHover,
          borderColor: v.tintedBorderColorHover,
        },

        ':focus': {
          boxShadow: 'none',
        },
      }),

      // Overrides for "disabled" buttons
      ...(p.disabled && {
        // pointer events intentionally not disabled for focusable disabled buttons
        // so that hover events work
        pointerEvents: 'none',
      }),

      // Overrides for "disabled" or "disabledFocusable" buttons
      ...((p.disabled || p.disabledFocusable) && {
        cursor: 'default',
        color: v.colorDisabled,
        boxShadow: 'none',
        ':hover': {
          color: v.colorDisabled,
        },

        ...(p.text && {
          color: v.textColorDisabled,
          backgroundColor: 'transparent',
          ':hover': {
            color: v.textColorDisabled,
          },
          ':active': {
            color: v.textColorDisabled,
          },
        }),

        ...(!p.text && {
          backgroundColor: v.backgroundColorDisabled,
          borderColor: v.borderColorDisabled,
        }),
      }),

      ...(p.fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(p.iconOnly && {
        minWidth: v.height,
        padding: 0,

        ...(!p.inverted &&
          !p.disabledFocusable && {
            ':hover': {
              ...getIconFillOrOutlineStyles({ outline: false }),
              color: v.textColorIconOnlyHover,
              background: v.backgroundColorIconOnlyHover,
            },
          }),

        ...(p.size === 'small' && {
          minWidth: v.sizeSmallHeight,
        }),
      }),
    };
  },

  icon: ({ props: p, variables: v }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.iconSize,
    height: v.iconSize,

    // when loading, hide the icon
    ...(p.loading && {
      margin: 0,
      opacity: 0,
      width: 0,
    }),

    ...(p.hasContent && {
      margin: `0 ${pxToRem(10)} 0 0`,
      ...(p.iconPosition === 'after' && {
        margin: `0 0 0 ${pxToRem(10)}`,
      }),
    }),
  }),

  loader: ({ props: p, variables: v }): ICSSInJSStyle => ({
    [`& .${loaderSlotClassNames.indicator}`]: {
      width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
      height: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
    },
    [`& .${loaderSlotClassNames.indicator} > svg`]: {
      width: p.size === 'small' ? v.sizeSmallLoaderSize : v.loaderSize,
      height: p.size === 'small' ? v.sizeSmallLoaderSvgHeight : v.loaderSvgHeight,
    },

    ...(p.hasContent && {
      marginRight: pxToRem(4),
    }),
  }),
};
