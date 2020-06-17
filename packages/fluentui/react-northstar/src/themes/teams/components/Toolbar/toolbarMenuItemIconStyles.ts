import { ComponentSlotStylesPrepared } from '@fluentui/styles';

import { pxToRem } from '../../../../utils';
import { ToolbarMenuItemIconStylesProps } from '../../../../components/Toolbar/ToolbarMenuItemIcon';
import { ToolbarVariables } from './toolbarVariables';

const toolbarMenuItemIconStyles: ComponentSlotStylesPrepared<ToolbarMenuItemIconStylesProps, ToolbarVariables> = {
  root: ({ props: p }) => ({
    ...(p.hasContent && {
      marginRight: pxToRem(10),
    }),
  }),
};

export default toolbarMenuItemIconStyles;
