import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { getColorScheme } from '../../colors';
import { ToolbarMenuStylesProps } from '../../../../components/Toolbar/ToolbarMenu';
import initialPopperStyles from '../../../../utils/positioner/initialStyles';
import { ToolbarVariables } from './toolbarVariables';

const toolbarMenuStyles: ComponentSlotStylesPrepared<ToolbarMenuStylesProps, ToolbarVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);

    return {
      ...(initialPopperStyles as ICSSInJSStyle),

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
      width: v.menuWidth,
      zIndex: v.overlayZIndex,
    };
  },
};

export default toolbarMenuStyles;
