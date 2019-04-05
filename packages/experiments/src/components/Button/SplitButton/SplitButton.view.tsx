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
    tokens,
    children,
    primary,
    disabled,
    onClick,
    ariaLabel,
    expanded,
    menu: Menu,
    primaryActionDisabled,
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

  return (
    <Slots.root horizontal as="span" verticalAlign="stretch">
      <Slots.button
        primary={primary}
        disabled={primaryActionDisabled || disabled}
        aria-disabled={primaryActionDisabled || disabled}
        aria-label={ariaLabel}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Slots.button>

      <Slots.splitDivider />

      <Slots.menuButton
        primary={primary}
        disabled={disabled}
        expanded={expanded}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        onClick={onSecondaryActionClick}
        menu={Menu}
      />
    </Slots.root>
  );
};
