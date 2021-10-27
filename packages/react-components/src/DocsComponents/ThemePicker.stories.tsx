import * as React from 'react';
import { MenuButton, Menu, MenuPopover, MenuItemRadio, MenuList, MenuTrigger, makeStyles } from '../index';
import { PaintBucket24Filled } from '@fluentui/react-icons';
import { themes, setGlobalTheme } from '@fluentui/react-storybook-addon';

const useStyles = makeStyles({
  menuButton: {
    minWidth: '210px',
  },

  menuPopover: {
    minWidth: '210px',
  },
});

/**
 * Theme picker used in the react-components docs header
 */
export const ThemePicker: React.FC<{ selectedThemeId?: string }> = ({ selectedThemeId }) => {
  const styles = useStyles();
  const onCheckedValueChange = (
    e: React.MouseEvent | React.KeyboardEvent,
    data: {
      name: string;
      checkedItems: string[];
    },
  ) => {
    setGlobalTheme(data.checkedItems[0]);
  };

  const selectedTheme = themes.find(theme => theme.id === selectedThemeId);

  return (
    <Menu
      onCheckedValueChange={onCheckedValueChange}
      checkedValues={{ theme: selectedThemeId ? [selectedThemeId] : [] }}
    >
      <MenuTrigger>
        <MenuButton className={styles.menuButton} icon={<PaintBucket24Filled />}>
          {selectedTheme?.label}
        </MenuButton>
      </MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
        <MenuList>
          {themes.map(theme => (
            <MenuItemRadio name="theme" value={theme.id} key={theme.id}>
              {theme.label}
            </MenuItemRadio>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
