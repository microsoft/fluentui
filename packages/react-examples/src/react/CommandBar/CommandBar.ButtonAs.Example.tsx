import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { CommandBarButton, IButtonProps, IButtonStyles } from '@fluentui/react/lib/Button';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import {
  IContextualMenuItemProps,
  ContextualMenuItem,
  IContextualMenuItemStyles,
  IContextualMenuStyles,
} from '@fluentui/react/lib/ContextualMenu';
import { getTheme, concatStyleSets } from '@fluentui/react/lib/Styling';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';

const theme = getTheme();
// Styles for both command bar and overflow/menu items
const itemStyles: Partial<IContextualMenuItemStyles> = {
  label: { fontSize: 18 },
  icon: { color: theme.palette.red },
  iconHovered: { color: theme.palette.redDark },
};
// For passing the styles through to the context menus
const menuStyles: Partial<IContextualMenuStyles> = {
  subComponentStyles: { menuItem: itemStyles, callout: {} },
};

const getCommandBarButtonStyles = memoizeFunction(
  (originalStyles: IButtonStyles | undefined): Partial<IContextualMenuItemStyles> => {
    if (!originalStyles) {
      return itemStyles;
    }

    return concatStyleSets(originalStyles, itemStyles);
  },
);

// Custom renderer for main command bar items
const CustomButton: React.FunctionComponent<IButtonProps> = props => {
  const buttonOnMouseClick = () => alert(`${props.text} clicked`);
  // eslint-disable-next-line react/jsx-no-bind
  return <CommandBarButton {...props} onClick={buttonOnMouseClick} styles={getCommandBarButtonStyles(props.styles)} />;
};

// Custom renderer for menu items (these must have a separate custom renderer because it's unlikely
// that the same component could be rendered properly as both a command bar item and menu item).
// It's also okay to custom render only the command bar items without changing the menu items.
const CustomMenuItem: React.FunctionComponent<IContextualMenuItemProps> = props => {
  // Due to ContextualMenu implementation quirks, passing styles or onClick here doesn't work.
  // The onClick handler must be on the ICommandBarItemProps item instead (_overflowItems in this example).
  return <ContextualMenuItem {...props} />;
};

const overflowProps: IButtonProps = {
  ariaLabel: 'More commands',
  menuProps: {
    contextualMenuItemAs: CustomMenuItem,
    // Styles are passed through to menu items here
    styles: menuStyles,
    items: [], // CommandBar will determine items rendered in overflow
    isBeakVisible: true,
    beakWidth: 20,
    gapSpace: 10,
    directionalHint: DirectionalHint.topCenter,
  },
};

export const CommandBarButtonAsExample: React.FunctionComponent = () => {
  return (
    <CommandBar
      overflowButtonProps={overflowProps}
      // Custom render all buttons
      buttonAs={CustomButton}
      items={_items}
      overflowItems={_overflowItems}
      farItems={_farItems}
    />
  );
};

const _items: ICommandBarItemProps[] = [
  {
    key: 'newItem',
    text: 'New',
    iconProps: { iconName: 'Add' },
    subMenuProps: {
      // Must specify the menu item type for submenus too!
      contextualMenuItemAs: CustomMenuItem,
      // Styles are passed through to menu items here
      styles: menuStyles,
      items: [
        { key: 'emailMessage', text: 'Email message', iconProps: { iconName: 'Mail' } },
        { key: 'calendarEvent', text: 'Calendar event', iconProps: { iconName: 'Calendar' } },
      ],
    },
  },
  {
    key: 'upload',
    text: 'Upload',
    iconProps: { iconName: 'Upload' },
    href: 'https://developer.microsoft.com/en-us/fluentui',
  },
  { key: 'share', text: 'Share', iconProps: { iconName: 'Share' }, onClick: () => console.log('Share') },
  { key: 'download', text: 'Download', iconProps: { iconName: 'Download' }, onClick: () => console.log('Download') },
];

const _overflowItems: ICommandBarItemProps[] = [
  { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
  { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
  { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: 'tile',
    text: 'Grid view',
    // This needs an ariaLabel since it's icon-only
    ariaLabel: 'Grid view',
    iconOnly: true,
    iconProps: { iconName: 'Tiles' },
    onClick: () => console.log('Tiles'),
  },
  {
    key: 'info',
    text: 'Info',
    ariaLabel: 'Info',
    iconOnly: true,
    iconProps: { iconName: 'Info' },
    onClick: () => console.log('Info'),
  },
];
