import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { ToolbarVariables } from './toolbarVariables';
import { getColorScheme } from '../../colors';
import { ToolbarDividerStylesProps } from '../../../../components/Toolbar/ToolbarDivider';

export const toolbarDividerStyles: ComponentSlotStylesPrepared<ToolbarDividerStylesProps, ToolbarVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme);
    return {
      borderLeft: `1px solid ${v.dividerBorder || colors.border}`,
      margin: v.dividerMargin,
      alignSelf: 'stretch',
    };
  },
};
