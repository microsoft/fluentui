import { pxToRem } from '../../../../utils';
import { StrictColorScheme, ItemType } from '../../../types';
import { MenuVariables, menuColorAreas } from './menuVariables';
import { default as MenuItem, MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem';
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
  transition: 'color .1s ease'
});

const getActionStyles = ({
  props: { primary, underlined, iconOnly, vertical },
  variables: v,
  colors
}: {
  props: MenuItemPropsAndState;
  variables: MenuVariables;
  colors: StrictColorScheme<ItemType<typeof menuColorAreas>>;
}): ICSSInJSStyle =>
  underlined || iconOnly
    ? {
        color: v.color
      }
    : primary
    ? {
        color: colors.foregroundActive,
        background: v.backgroundColorActive || colors.backgroundActive,
        [`&>.${MenuItem.className}>.${MenuItem.slotClassNames.indicator}`]: {
          backgroundImage: submenuIndicatorUrl(colors.foregroundActive, vertical)
        }
      }
    : {
        color: v.color,
        background: v.backgroundColorActive || colors.backgroundActive
      };

const getFocusedStyles = ({
  props,
  variables: v,
  colors
}: {
  props: MenuItemPropsAndState;
  variables: MenuVariables;
  colors: StrictColorScheme<ItemType<typeof menuColorAreas>>;
}): ICSSInJSStyle => {
  const { primary, underlined, isFromKeyboard, active, vertical } = props;
  if (active && !underlined && !vertical) return {};
  return {
    color: primary ? colors.foregroundFocus : v.colorActive,
    background: v.backgroundColorFocus || colors.backgroundFocus,
    ...(vertical && isFromKeyboard && !primary
      ? {
          border: `solid 1px ${v.borderColorFocus}`,
          outline: `solid 1px ${v.outlineColorFocus}`,
          margin: pxToRem(1),
          background: v.verticalBackgroundColorFocus || colors.backgroundFocus
        }
      : {})
  };
};

const getHoverStyles = ({
  props,
  variables: v,
  colors
}: {
  props: MenuItemPropsAndState;
  variables: MenuVariables;
  colors: StrictColorScheme<ItemType<typeof menuColorAreas>>;
}): ICSSInJSStyle => {
  const { underlined, active, vertical } = props;
  if (active && !underlined && !vertical) return {};
  return {
    ...(underlined
      ? {
          color: v.colorActive
        }
      : {
          color: colors.foregroundHover,
          background: v.backgroundColorHover || colors.backgroundHover,
          [`&>.${MenuItem.className}>.${MenuItem.slotClassNames.indicator}`]: {
            backgroundImage: submenuIndicatorUrl(colors.foregroundHover, vertical)
          }
        })
  };
};

const pointingBeak = ({
  props,
  variables: v,
  colors
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
      borderLeft: `1px solid ${borderColor}`
    };
    top = '-1px'; // 1px for the border
  } else {
    borders = {
      borderBottom: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`
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
      transition: 'background .1s ease'
    }
  };
};

const menuItemStyles: ComponentSlotStylesPrepared<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables: v }): ICSSInJSStyle => {
    const { active, disabled, iconOnly, isFromKeyboard, pills, pointing, secondary, underlined, vertical, primary } = props;

    const colors = getColorScheme(v.colorScheme, null, primary);

    return {
      color: 'inherit',
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',

      ...(secondary && {
        background: 'salmon'
      }),

      ...(vertical && {
        border: `solid ${v.verticalItemBorderWidth} ${v.verticalItemBorderColor}`
      }),

      ...(pills && {
        ...(vertical ? { margin: `0 0 ${verticalPillsBottomMargin} 0` } : { margin: `0 ${horizontalPillsRightMargin} 0 0` }),
        borderRadius: pxToRem(5)
      }),

      ...(underlined && {
        display: 'flex',
        alignItems: 'center',
        height: pxToRem(29),
        lineHeight: v.lineHeightBase,
        padding: `0 ${pxToRem(4)}`,
        margin: `0 ${pxToRem(4)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(4)}`
        },
        boxShadow: 'none'
      }),

      // item separator
      ...(!vertical &&
        !pills &&
        !underlined &&
        !iconOnly && {
          boxShadow: `-1px 0 0 0 ${primary ? v.primaryBorderColor : v.borderColor || colors.border} inset`
        }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, colors }),

        ...(pointing &&
          vertical &&
          !isFromKeyboard && {
            '::before': {
              content: `''`,
              position: 'absolute',
              width: pxToRem(3),
              height: `calc(100% + ${pxToRem(4)})`,
              top: pxToRem(-2),
              backgroundColor: v.pointingIndicatorBackgroundColor,
              ...(pointing === 'end' ? { right: pxToRem(-2) } : { left: pxToRem(-2) })
            }
          }),

        ...(pointing &&
          !vertical && {
            ...pointingBeak({ props, variables: v, colors })
          })
      }),

      ...(iconOnly && {
        display: 'flex',

        // focus styles
        ...(isFromKeyboard && {
          color: v.iconOnlyColorActive
        }),

        // hover styles
        ':hover': {
          color: v.iconOnlyColorActive
        }
      }),

      ...(!iconOnly && {
        // focus styles
        ...(isFromKeyboard && getFocusedStyles({ props, variables: v, colors })),

        // hover styles
        ':hover': getHoverStyles({ props, variables: v, colors })
      }),

      ':first-child': {
        ...(!pills &&
          !iconOnly &&
          !(pointing && vertical) &&
          !underlined && {
            ...(vertical && {
              '::before': {
                display: 'none'
              }
            }),
            ...(!vertical && {
              borderBottomLeftRadius: pxToRem(3),
              borderTopLeftRadius: pxToRem(3)
            })
          })
      },

      ...(disabled && {
        color: v.colorDisabled || colors.foregroundDisabled,
        ':hover': {
          // empty - overwrite all existing hover styles
        }
      })
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
          border: '1px solid transparent'
        }),

      ...(iconOnly && {
        border: `${pxToRem(2)} solid transparent`
      }),

      ...(underlined
        ? { padding: `${pxToRem(4)} 0` }
        : pointing && vertical
        ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
        : vertical
        ? { padding: v.verticalItemPadding }
        : {
            padding: v.horizontalPadding
          }),

      ...(iconOnly && {
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }),

      // active styles
      ...(active && {
        ...(iconOnly && {
          color: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false })
        }),

        ...(primary
          ? {
              ...(underlined && {
                color: colors.borderActive,
                ...underlinedItem(v.borderColorActive || colors.borderActive)
              })
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(v.colorActive)
            })
      }),

      // focus styles
      ...(isFromKeyboard && {
        ...(iconOnly && {
          borderRadius: '50%',
          borderColor: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false })
        }),

        ...(primary
          ? {
              ...(iconOnly && {
                color: 'inherit',
                borderColor: v.borderColorActive || colors.borderActive
              }),

              ...(underlined && { color: 'inherit' }),

              ...(underlined && active && underlinedItem(colors.foregroundActive))
            }
          : {
              ...(underlined && { fontWeight: 700 }),

              ...(underlined && active && underlinedItem(v.colorActive))
            })
      }),

      ':focus': {
        outline: 0
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(iconOnly && getIconFillOrOutlineStyles({ outline: false })),

        ...(primary
          ? {
              ...(iconOnly && { color: 'inherit' }),
              ...(!active && underlined && underlinedItem(v.underlinedBorderColor || colors.backgroundActive))
            }
          : !active && underlined && underlinedItem(v.backgroundColorActive || colors.backgroundActive))
      },

      ...(disabled && {
        cursor: 'default',
        ':hover': {
          // reset all existing hover styles
          color: 'inherit'
        }
      })
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
        marginRight: pxToRem(16)
      })
    };
  },

  icon: ({ props: p }): ICSSInJSStyle => ({
    ...(!p.iconOnly && {
      // reduce margins so text has the dominant influence on the vertical height
      marginTop: 0,
      marginBottom: pxToRem(-8),
      verticalAlign: 'top'
    })
  }),

  menu: ({ variables: v }) => ({ zIndex: v.menuZIndex }),

  indicator: ({ props: p, variables: v, rtl }) => ({
    position: 'relative',
    float: 'right',
    left: pxToRem(12),
    userSelect: 'none',
    marginRight: pxToRem(4),

    ...(p.inSubmenu && {
      position: 'absolute',
      top: pxToRem(6),
      right: pxToRem(2),
      left: 'unset'
    }),

    backgroundImage: submenuIndicatorUrl(v.color, p.vertical),
    ...(rtl && {
      transform: `scaleX(-1)`
    }),
    content: '" "',
    display: 'block',
    overflow: 'hidden',
    height: pxToRem(16),
    width: pxToRem(16)
  })
};

export default menuItemStyles;
