/** @jsx withSlots */
import { ContextualMenu, DirectionalHint, Text } from 'office-ui-fabric-react';
import { withSlots } from '../../../Foundation';
import { FontIcon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { IMenuButtonComponent } from './MenuButton.types';

export const MenuButtonSlots: IMenuButtonComponent['slots'] = props => ({
  root: 'div',
  button: Button,
  icon: FontIcon,
  content: Text,
  menuArea: 'div',
  menu: ContextualMenu,
  menuIcon: FontIcon
});

export const MenuButtonView: IMenuButtonComponent['view'] = (props, slots) => {
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
    styles,
    ...rest
  } = props;
  let { keytipProps } = props;

  if (keytipProps && menu) {
    keytipProps = {
      ...keytipProps,
      hasMenu: true
    };
  }

  return (
    <slots.root ref={menuButtonRef}>
      <slots.button
        aria-expanded={expanded}
        onClick={onClick}
        disabled={disabled}
        allowDisabledFocus={allowDisabledFocus}
        keytipProps={keytipProps}
        {...rest}
      >
        {children}
        <slots.menuArea>
          <slots.menuIcon iconName="ChevronDown" />
        </slots.menuArea>
      </slots.button>
      {expanded && (
        <slots.menu
          target={menuButtonRef && menuButtonRef.current}
          onDismiss={onMenuDismiss}
          items={[]}
          directionalHint={DirectionalHint.bottomRightEdge}
        />
      )}
    </slots.root>
  );
};
