/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '../../../Foundation';
import { IButtonMenuComponent, IButtonMenuProps, IButtonMenuSlots } from './ButtonMenu.types';
import { ButtonMenuStyles as styles } from './ButtonMenu.styles';

const view: IButtonMenuComponent['view'] = props => {
  const { menuType = 'div', ...rest } = props;

  const Slots = getSlots<IButtonMenuProps, IButtonMenuSlots>(props, {
    root: menuType
  });

  return <Slots.root {...rest} />;
};

export const ButtonMenu: React.StatelessComponent<IButtonMenuProps> = createComponent({
  displayName: 'ButtonMenu',
  styles,
  view
});

export default ButtonMenu;
