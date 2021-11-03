import * as React from 'react';
import { MenuButton, Menu, MenuPopover, MenuItemRadio, MenuList, MenuTrigger, makeStyles } from '../index';
import { themes, ThemeIds, setGlobalTheme } from '@fluentui/react-storybook-addon';

const useStyles = makeStyles({
  menuButton: {
    minWidth: '210px',
    justifyContent: 'flex-start',
  },

  chevronIcon: {
    marginLeft: 'auto',
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
    setGlobalTheme(data.checkedItems[0] as ThemeIds);
  };

  const selectedTheme = themes.find(theme => theme.id === selectedThemeId);

  return (
    <Menu
      onCheckedValueChange={onCheckedValueChange}
      checkedValues={{ theme: selectedThemeId ? [selectedThemeId] : [] }}
    >
      <MenuTrigger>
        <MenuButton className={styles.menuButton} menuIcon={{ className: styles.chevronIcon }}>
          {selectedTheme?.label ?? 'Theme'}
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
