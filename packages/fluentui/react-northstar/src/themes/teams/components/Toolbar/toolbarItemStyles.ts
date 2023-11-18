import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarItemStylesProps } from '../../../../components/Toolbar/ToolbarItem';
import { ToolbarVariables } from './toolbarVariables';
import { getIconFillOrOutlineStyles } from '../../getIconFillOrOutlineStyles';
import { getColorScheme } from '../../colors';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const toolbarItemStyles: ComponentSlotStylesPrepared<ToolbarItemStylesProps, ToolbarVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    const { borderWidth } = siteVariables;
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });

    return {
      position: 'relative',
      backgroundColor: v.background,
      borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: v.borderRadius,
      height: v.itemHeight,
      minWidth: v.itemHeight,
      padding: v.itemPadding,
      color: v.foreground || colors.foreground1,
      cursor: 'pointer',
      userSelect: 'none',

      ':focus': borderFocusStyles[':focus'],

      ...(p.active && {
        color: v.foregroundActive || colors.foregroundActive,
        backgroundColor: v.backgroundActive,
        ...getIconFillOrOutlineStyles({ outline: false }),
      }),

      ':hover': {
        color: v.foregroundHover || colors.foregroundHover,
        backgroundColor: v.backgroundHover || colors.backgroundHover,
        ...getIconFillOrOutlineStyles({ outline: false }),
      },

      ':focus-visible': borderFocusStyles[':focus-visible'],

      ...((p.disabled || p.disabledFocusable) && {
        color: v.foregroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.backgroundDisabled,
        cursor: 'default',
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),

      ...(p.disabled && {
        // pointer events intentionally not disabled for focusable disabled toolbar items
        // so that hover events work
        pointerEvents: 'none',
      }),
    };
  },
};
