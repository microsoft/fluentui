import { pxToRem } from '../../../../utils';
import type { ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { ToolbarMenuItemIconStylesProps } from '../../../../components/Toolbar/ToolbarMenuItemIcon';
import type { ToolbarVariables } from './toolbarVariables';

export const toolbarMenuItemIconStyles: ComponentSlotStylesPrepared<
  ToolbarMenuItemIconStylesProps,
  ToolbarVariables
> = {
  root: ({ props: p }) => ({
    ...(p.hasContent && {
      marginRight: pxToRem(10),
      marginTop: pxToRem(3),
      display: 'flex',
      alignSelf: 'start',
    }),
  }),
};
