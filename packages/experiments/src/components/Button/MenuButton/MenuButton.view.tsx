/** @jsx withSlots */
import { ContextualMenu, DirectionalHint, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { FontIcon } from '../../../utilities/factoryComponents';

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
    icon: FontIcon,
    content: Text,
    menuArea: 'div',
    menu: ContextualMenu,
    menuIcon: FontIcon
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
        <Slots.menuArea>
          <Slots.menuIcon iconName="ChevronDown" />
        </Slots.menuArea>
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
