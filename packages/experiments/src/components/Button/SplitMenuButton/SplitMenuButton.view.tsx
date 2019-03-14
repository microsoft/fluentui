/** @jsx withSlots */
import { ContextualMenu, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { Icon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { ISplitMenuButtonComponent, ISplitMenuButtonProps, ISplitMenuButtonSlots } from './SplitMenuButton.types';

export const SplitMenuButtonView: ISplitMenuButtonComponent['view'] = props => {
  const {
    styles,
    tokens,
    children,
    primary,
    disabled,
    onClick,
    expanded,
    menu: Menu,
    primaryActionDisabled,
    onMenuDismiss,
    menuTarget,
    onSecondaryActionClick,
    ...rest
  } = props;

  const Slots = getSlots<ISplitMenuButtonProps, ISplitMenuButtonSlots>(props, {
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
    <Slots.root role="button" aria-disabled={disabled} horizontal as="span" verticalAlign="stretch">
      <Slots.button
        styles={styles}
        tokens={tokens}
        primary={primary}
        disabled={primaryActionDisabled || disabled}
        aria-disabled={primaryActionDisabled || disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
        <Slots.splitDivider />
      </Slots.button>

      <Slots.menuButton
        styles={styles}
        tokens={tokens}
        primary={primary}
        disabled={disabled}
        onClick={onSecondaryActionClick}
        menu={Menu}
      />
    </Slots.root>
  );
};
