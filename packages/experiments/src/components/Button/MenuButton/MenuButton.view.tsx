/** @jsx withSlots */
import { ContextualMenu, DirectionalHint, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { Icon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { IMenuButtonComponent, IMenuButtonProps, IMenuButtonSlots } from './MenuButton.types';

export const MenuButtonView: IMenuButtonComponent['view'] = props => {
  const { children, disabled, onClick, expanded, onMenuDismiss, menuTarget, ...rest } = props;

  const Slots = getSlots<IMenuButtonProps, IMenuButtonSlots>(props, {
    root: 'div',
    button: Button,
    stack: Stack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon
  });

  return (
    <Slots.root
      type="button" // stack doesn't take in native button props
      role="button"
      aria-disabled={disabled}
    >
      <Slots.button onClick={onClick} disabled={disabled} {...rest}>
        {children}
        <Stack.Item>
          <Slots.menuIcon iconName="ChevronDown" />
        </Stack.Item>
      </Slots.button>
      {expanded && (
        <Slots.menu target={menuTarget} onDismiss={onMenuDismiss} items={[]} directionalHint={DirectionalHint.bottomRightEdge} />
      )}
    </Slots.root>
  );
};
