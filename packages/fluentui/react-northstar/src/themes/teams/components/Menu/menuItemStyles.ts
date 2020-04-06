import { pxToRem } from '../../../../utils';
import { StrictColorScheme, ItemType } from '../../../types';
import { MenuVariables, menuColorAreas } from './menuVariables';
import MenuItem, { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem';
import { getColorScheme } from '../../colors';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import submenuIndicatorUrl from './submenuIndicatorUrl';

type MenuItemPropsAndState = MenuItemProps & MenuItemState;

export const verticalPillsBottomMargin = pxToRem(5);
export const horizontalPillsRightMargin = pxToRem(8);
export const verticalPointingBottomMargin = pxToRem(12);

export const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
});

const getFocusedStyles = ({
  props,
  variables: v,
  colors,
}: {
  props: MenuItemPropsAndState;
  variables: MenuVariables;
  colors: StrictColorScheme<ItemType<typeof menuColorAreas>>;
}): ICSSInJSStyle => {
  const { primary, underlined, active, vertical } = props;

  if (active && !underlined && !vertical) return {};

  return {
    color: v.colorActive || colors.foregroundActive,
    background: v.backgroundColorFocus || colors.backgroundFocus,

    ...(primary && {
      color: colors.foregroundFocus,
      background: colors.backgroundFocus,
    }),

    ...(vertical && {
      border: `solid 1px ${v.borderColorFocus}`,
      outline: `solid 1px ${v.outlineColorFocus}`,
      margin: pxToRem(1),
      background: v.verticalBackgroundColorFocus,
      color: v.colorFocus || colors.foregroundFocus,

      ...(primary && { color: v.color }),

      ...(active && {
        color: v.colorActive,
        background: v.backgroundColorActive || colors.backgroundActive,

        ...(primary && { color: colors.foregroundFocus }),
      }),
    }),
  };
};

const pointingBeak = ({
  props,
  variables: v,
  colors,
}: {
  props: MenuItemProps;
  variables: MenuVariables;
  colors: StrictColorScheme<ItemType<typeof menuColorAreas>>;
}): ICSSInJSStyle => {
  const { pointing, primary } = props;

  let top: string;
  let borders: ICSSInJSStyle;

  const backgroundColor = v.backgroundColorActive || colors.backgroundActive;
  const borderColor = v.borderColor || primary ? v.primaryBorderColor : colors.border;

  if (pointing === 'start') {
    borders = {
      borderTop: `1px solid ${borderColor}`,
      borderLeft: `1px solid ${borderColor}`,
    };
    top = '-1px'; // 1px for the border
  } else {
    borders = {
      borderBottom: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
    };
    top = '100%';
  }

  return {
    '::after': {
      visibility: 'visible',
      background: backgroundColor,
      position: 'absolute',
      content: '""',
      top,
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
      margin: '.5px 0 0',
      width: pxToRem(10),
      height: pxToRem(10),
      border: 'none',
      ...borders,
      zIndex: v.beakZIndex,
      transition: 'background .1s ease',
    },
  };
};

const menuItemStyles: ComponentSlotStylesPrepared<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables: v }): ICSSInJSStyle => {
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

      // active styles
      ...(active && {
        color: v.wrapperColorActive,

        ...(!underlined && {
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
        ...(!iconOnly && getFocusedStyles({ props, variables: v, colors })),
        ...(iconOnly && {
          background: v.iconOnlyWrapperBackgroundColorFocus,
          color: v.iconOnlyColorActive,
        }),
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

        [`&>.${MenuItem.className}>.${MenuItem.slotClassNames.indicator}`]: {
          backgroundImage: submenuIndicatorUrl(v.indicatorColorHover, vertical),

          ...(primary && {
            backgroundImage: submenuIndicatorUrl(v.primaryIndicatorColorHover, vertical),
          }),
        },
      },

      ...(iconOnly && {
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

  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { active, iconOnly, isFromKeyboard, pointing, primary, underlined, vertical, disabled } = p;

    const colors = getColorScheme(v.colorScheme, null, primary);

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',
      whiteSpace: 'nowrap',

      ...(pointing &&
        vertical && {
          border: '1px solid transparent',
        }),

      ...(iconOnly && {
        border: `${pxToRem(2)} solid transparent`,
      }),

      padding: v.horizontalPadding,
      ...(vertical && { padding: v.verticalItemPadding }),
      ...(pointing && vertical && { padding: `${pxToRem(8)} ${pxToRem(18)}` }),
      ...(underlined && { padding: `${pxToRem(4)} 0` }),

      ...(iconOnly && {
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active && {
        ...(iconOnly && {
          color: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),

        ...(underlined && {
          color: v.activeUnderlinedColor,

          ...underlinedItem(v.activeUnderlinedBorderBottomColor),

          ...(primary && {
            color: v.activeUnderlinedPrimaryColor,
            ...underlinedItem(v.borderColorActive || colors.borderActive),
          }),
          ...(!primary && { fontWeight: 700 }),
        }),
      }),

      // focus styles
      ...(isFromKeyboard && {
        color: 'inherit',

        ...(iconOnly && {
          borderRadius: '50%',
          borderColor: v.iconOnlyColorFocus,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),

        ...(primary
          ? {
              ...(iconOnly && {
                borderColor: v.borderColorActive || colors.borderActive,
              }),

              ...(underlined && active && underlinedItem(colors.foregroundActive)),
            }
          : {
              ...(underlined && { fontWeight: 700 }),
              ...(underlined && active && underlinedItem(v.colorActive)),
            }),
      }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: v.colorHover,

        ...(underlined && { color: v.underlinedColorHover }),

        ...(!disabled && {
          ...(iconOnly && getIconFillOrOutlineStyles({ outline: false })),
          ...(primary
            ? {
                ...(iconOnly && { color: 'inherit' }),
                ...(!active && underlined && underlinedItem(v.underlinedBorderColor || colors.backgroundActive)),
              }
            : !active && underlined && underlinedItem(v.backgroundColorActive || colors.backgroundActive)),
        }),
      },

      ...(disabled && {
        cursor: 'default',
      }),
    };
  },

  content: ({ props: p }): ICSSInJSStyle => {
    const widthAdjust = (p.icon ? 26 : 0) + (p.menu ? 16 : 0);
    return {
      whiteSpace: 'normal',
      lineHeight: 1.5,
      marginTop: pxToRem(-4),
      marginBottom: pxToRem(-4),
      display: 'inline-block',
      ...((p.inSubmenu || p.vertical) && {
        width: 'max-content',
        minWidth: pxToRem(46 - widthAdjust),
        maxWidth: pxToRem(262 - widthAdjust),
        marginRight: pxToRem(16),
      }),
    };
  },

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.iconSize,
    height: v.iconSize,

    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },

    ...(!!p.content && {
      marginRight: pxToRem(10),
    }),
    ...(!p.iconOnly && {
      // reduce margins so text has the dominant influence on the vertical height
      marginTop: 0,
      marginBottom: pxToRem(-8),
      verticalAlign: 'top',
    }),
  }),

  menu: ({ variables: v }) => ({ zIndex: v.menuZIndex }),

  indicator: ({ props: p, variables: v, rtl }) => {
    return {
      position: 'relative',
      float: 'right',
      left: pxToRem(12),
      userSelect: 'none',
      marginRight: pxToRem(4),

      ...(p.inSubmenu && {
        position: 'absolute',
        top: pxToRem(6),
        right: pxToRem(2),
        left: 'unset',
      }),

      ...(rtl && {
        transform: `scaleX(-1)`,
      }),
      content: '" "',
      display: 'block',
      overflow: 'hidden',
      height: pxToRem(16),
      width: pxToRem(16),

      backgroundImage: submenuIndicatorUrl(v.indicatorColor, p.vertical),

      ...(p.active && {
        backgroundImage: submenuIndicatorUrl(v.activeIndicatorColor, p.vertical),

        ...(p.primary && {
          backgroundImage: submenuIndicatorUrl(v.activePrimaryIndicatorColor, p.vertical),

          ...(p.vertical && {
            backgroundImage: submenuIndicatorUrl(v.activePrimaryVerticalIndicatorColor, p.vertical),
          }),
        }),
      }),

      ...(p.underlined && { backgroundImage: submenuIndicatorUrl(v.indicatorColor, p.vertical) }),
      ...(p.iconOnly && { backgroundImage: submenuIndicatorUrl(v.indicatorColor, p.vertical) }),
    };
  },
};

export default menuItemStyles;
