import { pxToRem } from '../../../../utils';
import { MenuVariables } from './menuVariables';
import { MenuItemWrapperStylesProps } from '../../../../components/Menu/MenuItemWrapper';
import { menuItemClassName } from '../../../../components/Menu/MenuItem';
import { menuItemIndicatorClassName } from '../../../../components/Menu/MenuItemIndicator';
import { getColorScheme } from '../../colors';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { submenuIndicatorDirection } from './submenuIndicatorDirection';
import {
  horizontalPillsRightMargin,
  verticalPillsBottomMargin,
  pointingBeak,
  getFocusedStyles,
} from './menuItemStyles';

export const menuItemWrapperStyles: ComponentSlotStylesPrepared<MenuItemWrapperStylesProps, MenuVariables> = {
  root: ({ props, variables: v }): ICSSInJSStyle => {
    const {
      active,
      disabled,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
      primary,
      on,
    } = props;
    const colors = getColorScheme(v.colorScheme, null, primary);
    return {
      color: 'inherit',
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',

      ...(secondary && {
        background: 'salmon',
      }),

      ...(vertical && {
        border: `solid ${v.verticalItemBorderWidth} ${v.verticalItemBorderColor}`,
      }),

      ...(pills && {
        ...(vertical
          ? { margin: `0 0 ${verticalPillsBottomMargin} 0` }
          : { margin: `0 ${horizontalPillsRightMargin} 0 0` }),
        borderRadius: pxToRem(5),
      }),

      ...(underlined && {
        display: 'flex',
        alignItems: 'center',
        height: pxToRem(29),
        lineHeight: v.lineHeightBase,
        padding: `0 ${pxToRem(4)}`,
        margin: `0 ${pxToRem(4)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(4)}`,
        },
        boxShadow: 'none',
      }),

      // item separator
      ...(!vertical &&
        !pills &&
        !underlined &&
        !iconOnly && {
          boxShadow: `-1px 0 0 0 ${primary ? v.primaryBorderColor : v.borderColor || colors.border} inset`,
        }),

      // primary styles
      ...(primary &&
        !vertical &&
        !underlined && {
          color: v.primaryWrapperColor,
        }),

      // active styles
      ...(active &&
        !vertical && {
          color: v.wrapperColorActive,
          ...(!underlined && {
            background: v.backgroundColorActive,
          }),

          ...(primary &&
            !vertical &&
            !underlined && {
              color: v.primaryWrapperColor,
            }),

          ...(!underlined &&
            on !== 'hover' && {
              background: v.backgroundColorActive || colors.backgroundActive,

              ...(iconOnly && { background: v.activeIconOnlyWrapperBackgroundColor }),
              ...(!iconOnly &&
                primary && {
                  color: colors.foregroundActive,
                }),
            }),

          ...(underlined && {
            color: v.activeUnderlinedWrapperColor,
          }),

          ...(pointing &&
            !vertical && {
              ...pointingBeak({ props, variables: v, colors }),
            }),
        }),

      ...(isFromKeyboard && {
        color: v.wrapperColorFocus,

        ...(!underlined && {
          background: v.wrapperBackgroundColorFocus,
          ...(primary && {
            background: v.primaryWrapperBackgroundColorFocus,
            color: v.primaryWrapperColorFocus,
          }),
        }),
        ...(!iconOnly && !underlined && getFocusedStyles({ props, variables: v, colors })),
        ...(iconOnly && {
          background: v.iconOnlyWrapperBackgroundColorFocus,
          color: v.iconOnlyColorActive,
        }),
      }),

      ...(active && {
        '[data-tabs="true"]': {
          ...(!underlined && {
            background: v.backgroundColorActive || colors.backgroundActive,

            ...(iconOnly && { background: v.activeIconOnlyWrapperBackgroundColor }),
            ...(!iconOnly &&
              primary && {
                color: colors.foregroundActive,
              }),
          }),
          ...(pointing &&
            vertical && {
              '::before': {
                content: `''`,
                position: 'absolute',
                width: pxToRem(3),
                height: `calc(100% + ${pxToRem(4)})`,
                top: pxToRem(-2),
                backgroundColor: v.pointingIndicatorBackgroundColor,

                ...(isFromKeyboard && { display: 'none' }),
                ...(pointing === 'end' ? { right: pxToRem(-2) } : { left: pxToRem(-2) }),
              },
            }),
        },
      }),

      // hover styles
      ':hover': {
        color: v.wrapperColorHover,
        background: v.backgroundColorHover || colors.backgroundHover,

        ...(active && {
          background: v.activeWrapperBackgroundColorHover,
        }),

        ...(vertical && {
          color: v.wrapperColorHover,
          background: v.backgroundColorHover || colors.backgroundHover,
          borderRadius: pxToRem(4),
        }),

        ...(primary && {
          color: v.primaryWrapperColorHover,
        }),

        ...(underlined && {
          color: v.underlinedWrapperColorHover,
          background: v.underlinedWrapperBackgroundHover,
        }),

        ...(iconOnly && {
          background: v.iconOnlyBackgroundColorHover,
          color: v.iconOnlyColorHover,
        }),

        [`&>.${menuItemClassName}>.${menuItemIndicatorClassName}`]: {
          color: v.indicatorColorHover,

          ...(primary && {
            color: v.primaryIndicatorColorHover,
          }),

          ...submenuIndicatorDirection(vertical),
        },
      },

      ...(iconOnly && {
        borderRadius: v.iconOnlyBorderRadius,
        display: 'flex',
      }),

      ':first-child': {
        ...(!pills &&
          !iconOnly &&
          !(pointing && vertical) &&
          !underlined && {
            ...(vertical && {
              '::before': {
                display: 'none',
              },
            }),
            ...(!vertical && {
              borderBottomLeftRadius: pxToRem(3),
              borderTopLeftRadius: pxToRem(3),
            }),
          }),
      },

      ...(disabled && {
        color: v.colorDisabled || colors.foregroundDisabled,
        cursor: 'default',
        ':hover': {
          // empty - overwrite all existing hover styles
        },
      }),
    };
  },
};
