import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { MenuItemWrapperStylesProps } from '../../../../components/Menu/MenuItemWrapper';
import { MenuVariables } from '../../../teams/components/Menu/menuVariables';

export const toolbarItemStyles: ComponentSlotStylesPrepared<MenuItemWrapperStylesProps, MenuVariables> = {
  root: () => ({
    border: 'none',
  }),
};
