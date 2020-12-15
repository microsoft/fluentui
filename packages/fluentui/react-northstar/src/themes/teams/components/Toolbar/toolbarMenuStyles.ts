import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { ToolbarMenuStylesProps } from '../../../../components/Toolbar/ToolbarMenu';
import { ToolbarVariables } from './toolbarVariables';

export const toolbarMenuStyles: ComponentSlotStylesPrepared<ToolbarMenuStylesProps, ToolbarVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);

    return {
      display: 'flex',
      flexDirection: 'column',
      listStyleType: 'none',
      margin: 0,
      padding: v.menuPadding,
      backgroundColor: v.menuBackground || colors.background,
      boxShadow: v.menuBoxShadow,
      borderStyle: 'solid',
      borderColor: v.menuBorder || colors.border,
      borderWidth: v.menuBorderWidth,
      borderRadius: v.menuBorderRadius,
      maxWidth: v.menuMaxWidth,
      zIndex: v.overlayZIndex,
    };
  },
};
