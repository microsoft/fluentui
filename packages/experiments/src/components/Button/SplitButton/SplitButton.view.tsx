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
    ariaLabel,
    expanded,
    menu: Menu,
    primaryActionDisabled,
    secondaryAriaLabel,
    buttonRef,
    onMenuDismiss,
    menuTarget,
    onSecondaryActionClick,
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
        ariaLabel={ariaLabel}
        onClick={onClick}
        componentRef={buttonRef}
        content={content}
        {...rest}
      >
        {children}
      </Slots.button>

      <Slots.splitDivider />

      <Slots.menuButton
        primary={primary}
        disabled={disabled}
        expanded={expanded}
        ariaLabel={menuButtonAriaLabel}
        onClick={onSecondaryActionClick}
        menu={Menu}
      />
    </Slots.root>
  );
};
