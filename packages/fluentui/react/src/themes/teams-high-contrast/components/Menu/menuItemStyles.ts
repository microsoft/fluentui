import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { MenuVariables } from '../../../teams/components/Menu/menuVariables';
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem';

type MenuItemPropsAndState = MenuItemProps & MenuItemState;

const menuItemStyles: ComponentSlotStylesPrepared<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ':hover': {
        color: v.colorActive,

        ...(p.underlined && { color: v.color }),
        ...(!p.underlined && { background: v.backgroundColorFocus })
      },

      ...(p.active && {
        ...(!p.underlined && { background: v.backgroundColorActive })
      })
    };
  }
};

export default menuItemStyles;
