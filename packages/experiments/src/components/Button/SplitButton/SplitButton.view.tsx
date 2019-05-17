/** @jsx withSlots */
import { ContextualMenu, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { Icon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { ISplitButtonComponent, ISplitButtonProps, ISplitButtonSlots } from './SplitButton.types';

export const SplitButtonView: ISplitButtonComponent['view'] = props => {
  const {
    styles,
    children,
    content,
    primary,
    disabled,
    onClick,
    onKeyDown,
    allowDisabledFocus,
    ariaLabel,
    keytipProps,
    defaultExpanded,
    expanded,
    onMenuDismiss,
    menuTarget,
    primaryActionDisabled,
    secondaryAriaLabel,
    onSecondaryActionClick,
    root,
    button,
    menu,
    buttonRef,
    ...rest
  } = props;

  const Slots = getSlots<ISplitButtonProps, ISplitButtonSlots>(props, {
    root: Stack,
    button: Button,
    menuButton: MenuButton,
    stack: Stack,
    icon: Icon,
    content: Text,
    menu: ContextualMenu,
    menuIcon: Icon,
    splitDivider: 'span'
  });

  const menuButtonAriaLabel = secondaryAriaLabel ? secondaryAriaLabel : ariaLabel ? ariaLabel : (content as string);

  return (
    <Slots.root horizontal as="span" verticalAlign="stretch">
      <Slots.button
        primary={primary}
        disabled={primaryActionDisabled || disabled}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={ariaLabel}
        onClick={onClick}
        componentRef={buttonRef}
        content={content}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {children}
      </Slots.button>

      <Slots.splitDivider />

      <Slots.menuButton
        primary={primary}
        disabled={disabled}
        expanded={expanded || defaultExpanded}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={menuButtonAriaLabel}
        onClick={onSecondaryActionClick}
        keytipProps={keytipProps}
        menu={menu}
        onKeyDown={onKeyDown}
        onMenuDismiss={onMenuDismiss}
        menuTarget={menuTarget}
      />
    </Slots.root>
  );
};
