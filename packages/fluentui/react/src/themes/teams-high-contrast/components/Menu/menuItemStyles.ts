import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { MenuVariables } from '../../../teams/components/Menu/menuVariables';
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem';

type MenuItemPropsAndState = MenuItemProps & MenuItemState;

const menuItemStyles: ComponentSlotStylesPrepared<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ':hover': {
        ...(!p.underlined && { background: v.backgroundColorFocus })
      }
    };
  }
};

export default menuItemStyles;
