/** @jsx withSlots */
import { ContextualMenu, Text } from 'office-ui-fabric-react';
import { withSlots } from '../../../Foundation';
import { FontIcon } from '../../../utilities/factoryComponents';

import { Button } from '../Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { ISplitButtonComponent, ISplitButtonTokens } from './SplitButton.types';

export const SplitButtonSlots: ISplitButtonComponent['slots'] = props => ({
  root: 'span',
  button: Button,
  menuButton: MenuButton,
  icon: FontIcon,
  content: Text,
  menuArea: 'span',
  menu: ContextualMenu,
  menuIcon: FontIcon,
  splitDividerContainer: 'span',
  splitDivider: 'span'
});

export const SplitButtonView: ISplitButtonComponent['view'] = (props, slots) => {
  const {
    styles,
    tokens,
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
    primaryActionDisabled,
    secondaryAriaLabel,
    onSecondaryActionClick,
    root,
    button,
    menu,
    buttonRef,
    menuButtonRef,
    ...rest
  } = props;

  const menuButtonAriaLabel = secondaryAriaLabel ? secondaryAriaLabel : ariaLabel ? ariaLabel : (content as string);

  const { contentPadding, contentPaddingFocused, secondaryPadding, ...splitButtonTokens } = tokens as ISplitButtonTokens;
  const {
    backgroundColor,
    backgroundColorHovered,
    backgroundColorPressed,
    borderColor,
    borderColorHovered,
    borderColorPressed,
    color,
    colorHovered,
    colorPressed,
    highContrastBackgroundColor,
    highContrastBackgroundColorHovered,
    highContrastBackgroundColorPressed,
    highContrastBorderColor,
    highContrastBorderColorHovered,
    highContrastBorderColorPressed,
    highContrastColor,
    highContrastColorHovered,
    highContrastColorPressed,
    highContrastIconColor,
    highContrastIconColorHovered,
    highContrastIconColorPressed,
    iconColor,
    iconColorHovered,
    iconColorPressed,
    ...nonColoredButtonTokens
  } = splitButtonTokens;
  const buttonTokens = primaryActionDisabled ? { contentPadding, contentPaddingFocused, ...nonColoredButtonTokens } : tokens;
  const menuButtonTokens = { contentPadding: secondaryPadding, ...splitButtonTokens };

  return (
    <slots.root>
      <slots.button
        primary={primary}
        disabled={primaryActionDisabled || disabled}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={ariaLabel}
        onClick={onClick}
        componentRef={buttonRef}
        content={content}
        onKeyDown={onKeyDown}
        tokens={buttonTokens}
        {...rest}
      >
        {children}
      </slots.button>

      <slots.splitDividerContainer>
        <slots.splitDivider />
      </slots.splitDividerContainer>

      <slots.menuButton
        primary={primary}
        disabled={disabled}
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        allowDisabledFocus={allowDisabledFocus}
        ariaLabel={menuButtonAriaLabel}
        onClick={onSecondaryActionClick}
        componentRef={menuButtonRef}
        keytipProps={keytipProps}
        menu={menu}
        onKeyDown={onKeyDown}
        onMenuDismiss={onMenuDismiss}
        tokens={menuButtonTokens}
      />
    </slots.root>
  );
};
