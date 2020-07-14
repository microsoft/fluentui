import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarVariables } from './toolbarVariables';
import { getColorScheme } from '../../colors';
import { ToolbarMenuDividerStylesProps } from '../../../../components/Toolbar/ToolbarMenuDivider';

export const toolbarMenuDividerStyles: ComponentSlotStylesPrepared<ToolbarMenuDividerStylesProps, ToolbarVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    return {
      borderTop: `1px solid ${v.menuDividerBorder || colors.border}`,
      margin: v.menuDividerMargin,
      alignSelf: 'stretch',
    };
  },
};
