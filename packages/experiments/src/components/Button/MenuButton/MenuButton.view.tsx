/** @jsx withSlots */
import { ContextualMenu, DirectionalHint, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { Icon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { IMenuButtonComponent, IMenuButtonProps, IMenuButtonSlots } from './MenuButton.types';

export const MenuButtonView: IMenuButtonComponent['view'] = props => {
  const {
    children,
    disabled,
    onClick,
    allowDisabledFocus,
    keytipProps: keytips,
    menu,
    expanded,
    onMenuDismiss,
    menuButtonRef,
    ...rest
  } = props;
  let { keytipProps } = props;

  if (keytipProps && menu) {
    keytipProps = {
      ...keytipProps,
      hasMenu: true
    };
  }

  const Slots = getSlots<IMenuButtonProps, IMenuButtonSlots>(props, {
    root: 'div',
    button: Button,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon
  });

  return (
    <Slots.root ref={menuButtonRef}>
      <Slots.button
        aria-expanded={expanded}
        onClick={onClick}
        disabled={disabled}
        allowDisabledFocus={allowDisabledFocus}
        keytipProps={keytipProps}
        {...rest}
      >
        {children}
        <Stack.Item>
          <Slots.menuIcon iconName="ChevronDown" />
        </Stack.Item>
      </Slots.button>
      {expanded && (
        <Slots.menu
          target={menuButtonRef && menuButtonRef.current}
          onDismiss={onMenuDismiss}
          items={[]}
          directionalHint={DirectionalHint.bottomRightEdge}
        />
      )}
    </Slots.root>
  );
};
