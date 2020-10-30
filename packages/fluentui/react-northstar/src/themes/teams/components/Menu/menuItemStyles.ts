import { pxToRem } from '../../../../utils';
import { StrictColorScheme, ItemType } from '../../../types';
import { MenuVariables, menuColorAreas } from './menuVariables';
import { MenuItemStylesProps } from '../../../../components/Menu/MenuItem';
import { getColorScheme } from '../../colors';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const verticalPillsBottomMargin = pxToRem(5);
export const horizontalPillsRightMargin = pxToRem(8);
export const verticalPointingBottomMargin = pxToRem(12);

export const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
});

export const getFocusedStyles = ({
  props,
  variables: v,
  colors,
}: {
  props: Pick<MenuItemStylesProps, 'primary' | 'underlined' | 'active' | 'vertical'>;
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

export const pointingBeak = ({
  props,
  variables: v,
  colors,
}: {
  props: Pick<MenuItemStylesProps, 'pointing' | 'primary'>;
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

export const menuItemStyles: ComponentSlotStylesPrepared<MenuItemStylesProps, MenuVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const { active, iconOnly, isFromKeyboard, pointing, primary, underlined, vertical, disabled } = p;

    const colors = getColorScheme(v.colorScheme, null, primary);

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
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
        overflow: 'visible',
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
            }
          : {
              ...(underlined && { fontWeight: 700 }),
              ...(underlined && active && underlinedItem(v.colorActive)),
            }),
        ...(underlined && {
          ...getBorderFocusStyles({ variables: siteVariables }),
          ':focus-visible': {
            ...getBorderFocusStyles({ variables: siteVariables })[':focus-visible'],
            borderColor: v.borderColorActive,
          },
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

  menu: ({ variables: v }) => ({ zIndex: v.menuZIndex }),
};
