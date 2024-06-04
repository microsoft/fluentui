import * as React from 'react';

import descriptionMd from './Description.md';

import { ContextualMenuItemType, DefaultButton, Icon, initializeIcons } from '@fluentui/react';
import type { IContextualMenuItem, IContextualMenuProps, IIconProps } from '@fluentui/react';
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import { MenuButtonShim } from '@fluentui/react-migration-v8-v9';

initializeIcons();

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '1fr',
    width: 'fit-content',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    columnGap: '10px',
    rowGap: '10px',
  },
  componentName: {
    justifySelf: 'end',
    margin: '0 10px 0 0',
  },
});

const addIcon: IIconProps = { iconName: 'Add' };
const mailIcon: IIconProps = { iconName: 'Mail' };
const calendarIcon: IIconProps = { iconName: 'Calendar' };
const shareIcon: IIconProps = { iconName: 'Share', style: { color: 'salmon' } };

export const Default = () => {
  const styles = useStyles();

  const [selection, setSelection] = React.useState<{ [key: string]: boolean }>({});

  const onToggleSelect = React.useCallback(
    (ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem): void => {
      ev && ev.preventDefault();

      if (item) {
        setSelection({
          ...selection,
          [item.key]: selection[item.key] === undefined ? true : !selection[item.key],
        });
      }
    },
    [selection],
  );

  const menuProps: IContextualMenuProps = {
    // For example: disable dismiss if shift key is held down while dismissing
    onDismiss: ev => {
      if (ev && 'shiftKey' in ev) {
        ev.preventDefault();
      }
    },
    items: [
      {
        key: 'newItem',
        iconProps: addIcon,
        text: 'New',
        subMenuProps: {
          items: [
            {
              key: 'newMailMessage',
              text: 'Mail Message',
              iconProps: mailIcon,
              secondaryText: 'Ctrl+Shift+M',
              onClick: () => {
                alert('New -> Mail Message clicked');
              },
            },
            {
              key: 'newCalendarItem',
              text: 'Calendar Item',
              iconProps: calendarIcon,
              onClick: () => {
                alert('New --> Calendar Item clicked');
              },
            },
          ],
        },
      },

      { key: 'divider_1', itemType: ContextualMenuItemType.Divider },
      {
        key: 'edit',
        text: 'Edit',
        onClick: () => {
          alert('Edit clicked');
        },
      },
      {
        key: 'delete',
        text: 'Delete',
        onClick: () => {
          alert('Delete clicked');
        },
      },
      { key: 'divider_2', itemType: ContextualMenuItemType.Divider },
      {
        key: 'favorite',
        text: 'Favorite',
        canCheck: true,
        checked: selection.favorite,
        onClick: onToggleSelect as IContextualMenuItem['onClick'],
      },
      {
        key: 'share',
        iconProps: shareIcon,
        text: 'Share',
        title: 'Share',
        onClick: () => {
          alert('Share clicked');
        },
      },
    ],
    directionalHintFixed: true,
  };

  return (
    <div className={styles.root}>
      <h3>v8</h3>
      <h3>shim</h3>
      <h3>v9</h3>
      <DefaultButton text="Menu Button" menuProps={menuProps} />
      <FluentProvider theme={webLightTheme}>
        <MenuButtonShim text="Menu Button" menuProps={menuProps} />
      </FluentProvider>
      <FluentProvider theme={webLightTheme}>
        <Menu hasIcons hasCheckmarks>
          <MenuTrigger>
            <MenuButton>Menu Button</MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <Menu>
                <MenuTrigger>
                  <MenuItem icon={<Icon {...addIcon} />}>New</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem icon={<Icon {...mailIcon} />} secondaryContent="Ctrl+Shift+M">
                      Mail Message
                    </MenuItem>
                    <MenuItem icon={<Icon {...calendarIcon} />}>Calendar Item</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
              <MenuDivider />
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuDivider />
              <MenuItemCheckbox name={'favorite'} value={'favorite'}>
                Favorite
              </MenuItemCheckbox>
              <MenuItem icon={<Icon {...shareIcon} />}>Share</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </FluentProvider>
    </div>
  );
};

export default {
  title: 'Migration Shims/V8/Button/MenuButtonShim',
  component: MenuButtonShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
