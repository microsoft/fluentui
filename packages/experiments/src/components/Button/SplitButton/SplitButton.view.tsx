/** @jsx withSlots */
import { ContextualMenu, Stack, Text } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../../Foundation';
import { Icon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { ISplitButtonComponent, ISplitButtonProps, ISplitButtonSlots, ISplitButtonTokens } from './SplitButton.types';

export const SplitButtonView: ISplitButtonComponent['view'] = props => {
  const {
    styles,
    tokens,
    children,
    content,
    primary,
    disabled,
    onClick,
    allowDisabledFocus,
    ariaLabel,
    defaultExpanded,
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

  const { contentPadding, contentPaddingFocused, secondaryPadding, ...splitButtonTokens } = tokens as ISplitButtonTokens;
  const {
    backgroundColor,
    backgroundColorHovered,
    backgroundColorPressed,
    color,
    colorHovered,
    colorPressed,
    ...nonColoredButtonTokens
  } = splitButtonTokens;
  const buttonTokens = primaryActionDisabled ? { contentPadding, contentPaddingFocused, nonColoredButtonTokens } : tokens;
  const menuButtonTokens = { contentPadding: secondaryPadding, ...splitButtonTokens };

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
        tokens={buttonTokens}
        {...rest}
      >
        {children}
      </Slots.button>

      <Slots.splitDivider />

      <Slots.menuButton
        primary={primary}
        disabled={disabled}
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={menuButtonAriaLabel}
        onClick={onSecondaryActionClick}
        menu={Menu}
        tokens={menuButtonTokens}
      />
    </Slots.root>
  );
};
